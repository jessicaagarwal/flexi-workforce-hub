
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';
import { toast } from 'sonner';

type FormData = {
  resignationReason: string;
  lastWorkingDate: Date;
  feedback: string;
  exitSurvey: string;
};

const resignationReasons = [
  'Better opportunity elsewhere',
  'Career change',
  'Relocation',
  'Family reasons',
  'Health issues',
  'Work environment',
  'Compensation',
  'Other'
];

type ResignationFormModalProps = {
  children: React.ReactNode;
};

const ResignationFormModal: React.FC<ResignationFormModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    defaultValues: {
      resignationReason: '',
      lastWorkingDate: addDays(new Date(), 30),
      feedback: '',
      exitSurvey: '',
    },
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Submitting resignation:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Resignation submitted successfully');
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to submit resignation');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Submit Resignation</DialogTitle>
          <DialogDescription>
            We're sorry to see you go. Please provide details about your resignation.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="resignationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Resignation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resignationReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastWorkingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Working Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < addDays(new Date(), 14)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your last working date should be at least 2 weeks from today
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide any additional details or comments about your resignation"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="exitSurvey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exit Survey</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What could we have done better? Your feedback helps us improve."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This information is confidential and will only be used for improvement purposes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Resignation'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResignationFormModal;
