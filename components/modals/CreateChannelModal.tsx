"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { useModalStore } from "@/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter a server name." }),
    imageUrl: z.string().min(1, { message: "Please enter a server image." })
});

export const CreateChannelModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type } = useModalStore();

    const isModalOpen = isOpen && type === "Create Channel";

    const form = useForm({
        resolver: zodResolver(formSchema),  
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", values);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClosed = () => {
        form.reset();
        onClose();
    };

    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClosed}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">Create your own server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">Give your server a personality. Add your server name & image. You can change it later.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Name 
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                className="text-black bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter a server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>  
    );
}