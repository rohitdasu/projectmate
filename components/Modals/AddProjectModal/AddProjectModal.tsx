import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Loader } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';
import { useToast } from '../../ui/use-toast';
import { useAppData } from '@/context/Common/CommonContext';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

export const AddProjectModal = ({ email }: { email?: string | null }) => {
  const [tagArray, setTagArray] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: '',
      repositoryURL: '',
      tags: '',
      description: '',
      liveUrl: '',
    },
  });

  const { toast } = useToast();
  const {
    state: { isOpen },
    closeModal,
  } = useAddProjectModal();
  const commonData = useAppData();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post(
        '/api/project',
        {
          title: data.projectname,
          description: data.description,
          githubRepository: data.repositoryURL,
          tags: tagArray,
          content: '',
          email: email,
          liveUrl: data.liveUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: 'Success',
        description: 'Project added successfully',
        variant: 'default',
      });
      form.reset();
      commonData.setRandomKey(String(Math.random())); // it will refresh the projects list in projects page
      closeModal();
    } catch (e) {
      toast({
        title: 'Failure',
        description: e?.response?.data?.error?.issues[0]?.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleTagsChange = () => {
    const tagsFieldValue = form.watch('tags');
    if (tagsFieldValue) {
      const tagsArray = tagsFieldValue.split(',').map((tag) => tag.trim());
      const limitedTagsArray = tagsArray.slice(0, 5);
      setTagArray(limitedTagsArray);
    } else {
      setTagArray([]);
    }
  };

  React.useEffect(() => {
    handleTagsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('tags')]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="project-modal-scroll max-h-[calc(100dvh-2rem)] max-w-2xl overflow-y-auto rounded-none border-2 border-[#0f0f0f] bg-[#f8f9fa] p-0 text-[#0f0f0f] shadow-[8px_8px_0_0_#0044ff] sm:!rounded-none [&>button:last-child]:text-white [&>button:last-child]:opacity-100">
        <DialogHeader className="border-b-2 border-[#0f0f0f] bg-[#0f0f0f] p-5 pr-14 text-white sm:text-left md:p-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#86a7ff]">
            Share it with the community
          </p>
          <DialogTitle className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
            Add your project
          </DialogTitle>
          <DialogDescription className="max-w-lg text-sm text-gray-300">
            Share the repository, add a few helpful tags, and help contributors
            find a place to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 sm:p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="projectname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      Project name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-none border-2 border-[#0f0f0f] bg-white placeholder:text-gray-400 focus-visible:border-[#0044ff] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="e.g. Open-source toolkit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repositoryURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      GitHub repository URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-none border-2 border-[#0f0f0f] bg-white placeholder:text-gray-400 focus-visible:border-[#0044ff] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="https://github.com/owner/repository"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      Live URL{' '}
                      <span className="font-medium normal-case tracking-normal text-gray-500">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-none border-2 border-[#0f0f0f] bg-white placeholder:text-gray-400 focus-visible:border-[#0044ff] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="https://your-project.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-none border-2 border-[#0f0f0f] bg-white placeholder:text-gray-400 focus-visible:border-[#0044ff] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="React, TypeScript, API"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Comma-separated, up to 5 tags.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {tagArray.length > 0 && (
                <section
                  className="col-span-full flex flex-row flex-wrap gap-2"
                  aria-label="Tag preview"
                >
                  {tagArray.map((tag, idx) => (
                    <Badge
                      variant="secondary"
                      className="rounded-none border border-[#0f0f0f] bg-[#eaf0ff] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0044ff]"
                      key={idx}
                    >
                      {tag}
                    </Badge>
                  ))}
                </section>
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-700">
                      Project description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24 resize-y rounded-none border-2 border-[#0f0f0f] bg-white placeholder:text-gray-400 focus-visible:border-[#0044ff] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="What does your project do, and how can someone contribute?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Write between 160 and 500 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full flex flex-col-reverse gap-3 border-t-2 border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  All fields except the live URL are required.
                </p>
                <Button
                  disabled={loading}
                  type="submit"
                  className="h-auto rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] px-6 py-3 font-display text-sm font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  {BUTTON_TEXT.submit}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
