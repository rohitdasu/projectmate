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
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Loader } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';
import { useToast } from '../ui/use-toast';

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
    },
  });

  const { toast } = useToast();
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
      window.location.reload();
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

  const {
    state: { isOpen },
    closeModal,
  } = useAddProjectModal();

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
      <DialogContent className="max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new project
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="projectname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your project name" {...field} />
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
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your github repository URL"
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
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter suitable tags for your project (5 max)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ex. React.js, Node.js, MongoDB (comma-separated)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {tagArray.length > 0 && (
                <section className="flex flex-row flex-wrap gap-1">
                  {tagArray.map((tag, idx) => (
                    <Badge variant="secondary" key={idx}>
                      {tag}
                    </Badge>
                  ))}
                </section>
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your project description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="float-right">
                {loading && <Loader className="mr-2 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
