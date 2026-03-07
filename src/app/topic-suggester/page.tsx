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
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
      <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 text-primary px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[0.75rem] md:text-sm font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Powered by AI
        </div>
        <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl text-foreground">AI Topic Suggester</h1>
        <p className="text-muted-foreground text-[0.9rem] md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Not sure what to present? Let our AI suggest compelling presentation topics and keywords based on your unique expertise and today's industry trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8 items-start">
        <div className="space-y-6 md:space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Your Expertise</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Cloud Infrastructure" {...field} className="text-sm" />
                    </FormControl>
                    <FormDescription className="text-xs md:text-sm">What's your primary skill or field?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2.5 md:space-y-3">
                <FormLabel className="text-sm md:text-base">Industry Trends</FormLabel>
                <div className="flex gap-1.5 md:gap-2">
                  <Input
                    value={currentTrend}
                    onChange={(e) => setCurrentTrend(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTrend())}
                    placeholder="Add a trend..."
                    className="text-sm"
                  />
                  <Button type="button" onClick={addTrend} size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
                  {trends.map(trend => (
                    <Badge key={trend} variant="secondary" className="pl-2 md:pl-3 pr-0.5 md:pr-1 py-0.5 md:py-1 gap-1 text-xs md:text-sm">
                      {trend}
                      <button onClick={() => removeTrend(trend)} className="hover:bg-muted p-0.5 rounded-full">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary text-sm md:text-base">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Ideas"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 md:space-y-6">
          {!results && !loading && (
            <div className="h-full min-h-[250px] md:min-h-[300px] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-6 md:p-8 text-center bg-muted/10">
              <div className="bg-white p-3 md:p-4 rounded-full shadow-sm mb-3 md:mb-4">
                <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-primary/40" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-foreground">Your ideas await</h3>
              <p className="text-muted-foreground max-w-xs text-sm md:text-base">
                Fill in your expertise and select trends to get tailored talk suggestions.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[250px] md:min-h-[300px] flex flex-col items-center justify-center p-6 md:p-8 space-y-4">
              <Loader2 className="w-10 md:w-12 h-10 md:h-12 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse text-sm md:text-base">Our AI is dreaming up the perfect topics...</p>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-4 md:space-y-6 animate-fade-in">
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 pb-3 md:pb-4">
                  <CardTitle className="text-primary flex items-center gap-2 text-base md:text-lg">
                    <Sparkles className="w-4 md:w-5 h-4 md:h-5" />
                    Suggested Presentation Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 md:pt-6">
                  <ul className="space-y-2 md:space-y-4">
                    {results.suggestedTopics.map((topic, i) => (
                      <li key={i} className="flex gap-3 md:gap-4 items-start p-2 md:p-3 rounded-md hover:bg-muted/50 transition-colors">
                        <span className="bg-primary/10 text-primary font-bold text-xs md:text-sm min-w-[22px] md:min-w-[24px] h-5 md:h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="font-medium text-sm md:text-lg leading-snug">{topic}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="text-sm md:text-base">Target Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {results.keywords.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="text-muted-foreground text-xs md:text-sm">
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
