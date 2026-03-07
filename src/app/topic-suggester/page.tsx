"use client"

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Plus, X } from 'lucide-react';
import { innovatorTopicSuggestion, type InnovatorTopicSuggestionOutput } from '@/ai/flows/innovator-topic-suggestion';

const formSchema = z.object({
  expertise: z.string().min(2, { message: "Please specify your expertise." }),
});

export default function TopicSuggester() {
  const [trends, setTrends] = useState<string[]>(["Artificial Intelligence", "Sustainability", "Remote Work"]);
  const [currentTrend, setCurrentTrend] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<InnovatorTopicSuggestionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expertise: "",
    },
  });

  const addTrend = () => {
    if (currentTrend.trim() && !trends.includes(currentTrend.trim())) {
      setTrends([...trends, currentTrend.trim()]);
      setCurrentTrend("");
    }
  };

  const removeTrend = (trendToRemove: string) => {
    setTrends(trends.filter(t => t !== trendToRemove));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const output = await innovatorTopicSuggestion({
        expertise: values.expertise,
        industryTrends: trends,
      });
      setResults(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-4 mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4" />
          Powered by AI
        </div>
        <h1 className="font-headline text-4xl text-foreground">AI Topic Suggester</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Not sure what to present? Let our AI suggest compelling presentation topics and keywords based on your unique expertise and today's industry trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 items-start">
        <div className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Expertise</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Cloud Infrastructure" {...field} />
                    </FormControl>
                    <FormDescription>What's your primary skill or field?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel>Industry Trends</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    value={currentTrend} 
                    onChange={(e) => setCurrentTrend(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTrend())}
                    placeholder="Add a trend..." 
                  />
                  <Button type="button" onClick={addTrend} size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {trends.map(trend => (
                    <Badge key={trend} variant="secondary" className="pl-3 pr-1 py-1 gap-1">
                      {trend}
                      <button onClick={() => removeTrend(trend)} className="hover:bg-muted p-0.5 rounded-full">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Ideas"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-6">
          {!results && !loading && (
            <div className="h-full min-h-[300px] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-8 text-center bg-muted/10">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Sparkles className="w-8 h-8 text-primary/40" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Your ideas await</h3>
              <p className="text-muted-foreground max-w-xs">
                Fill in your expertise and select trends to get tailored talk suggestions.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse">Our AI is dreaming up the perfect topics...</p>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Suggested Presentation Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {results.suggestedTopics.map((topic, i) => (
                      <li key={i} className="flex gap-4 items-start p-3 rounded-md hover:bg-muted/50 transition-colors">
                        <span className="bg-primary/10 text-primary font-bold text-sm min-w-[24px] h-6 flex items-center justify-center rounded-full mt-0.5">
                          {i + 1}
                        </span>
                        <p className="font-medium text-lg leading-snug">{topic}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Target Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.keywords.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="text-muted-foreground">
                        #{keyword.replace(/\s+/g, '')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
