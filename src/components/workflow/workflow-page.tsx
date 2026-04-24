"use client";

import { useCreateWorkflow, useDeleteWorkflow, useSuspenseWorkflow } from "@/hooks/client-suspense";
import useSearch from "@/hooks/params/use-debounce-search";
import { useWorkflowParams } from "@/hooks/params/use-workflow-params";
import { Pagination } from "../pagination"; 
import { WorkflowIcon , ArrowRightCircleIcon, DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function WorkflowPage() {
    const router = useRouter();
    const workflows = useSuspenseWorkflow();
    const createWorkflow = useCreateWorkflow();
    const deleteWorkflow = useDeleteWorkflow();
    const [params, setParams] = useWorkflowParams();
    const { searchValue, onSearchChange } = useSearch({
        params,
        setParams,
        debounceMS: 1000,
    });

    // Helper to format dates like "Oct 24, 2024"
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <main className="min-h-screen flex flex-col bg-surface text-on-surface antialiased font-body">

            {/* Page Content */}
            <div className="mt-20 flex-1 px-12 py-16 max-w-6xl mx-auto w-full">
                {/* Hero Header */}
                <div className="mb-20 space-y-6">
                    <h1 className="text-[3.5rem] font-black font-headline tracking-tighter leading-none text-primary">
                        Start creating your<br />workflows
                    </h1>
                    <p className="text-on-surface-variant max-w-md font-body leading-relaxed">
                        Connect logic, data, and human intent into seamless automated narratives. Your algorithm starts here.
                    </p>
                    <div className="pt-4">
                        <button 
                            onClick={() => createWorkflow.mutate()}
                            disabled={createWorkflow.isPending}
                            className="group flex items-center gap-4 bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold text-lg active:scale-95 transition-all shadow-xl shadow-black/5 disabled:opacity-70 text-white"
                        >
                            {createWorkflow.isPending ? "Creating..." : "Create Workflow"}
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                 <WorkflowIcon ></WorkflowIcon>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Dashboard List */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-4 mb-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-primary">Active Flows</h3>
                        </div>
                        <span className="signature-accent text-xs text-on-surface-variant opacity-60 font-label italic">
                            Showing {workflows.data.data.length} of {workflows.data.totalCount} workflows
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input 
                            type="text" 
                            placeholder="Search workflows..." 
                            value={searchValue} 
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-surface-container transition-colors rounded-xl border border-transparent focus:border-outline-variant/30 px-6 py-4 font-headline text-lg outline-none placeholder:text-on-surface-variant/50 text-on-surface bg-slate-100"
                        />
                    </div>

                    {/* Workflow Items */}
                    <div className="space-y-3">
                        {workflows.data.data.length === 0 && (
                            <div className="p-8 text-center text-on-surface-variant font-label">
                                No workflows found.
                            </div>
                        )}
                        
                        {workflows.data.data.map((workflow) => (
                            <div key={workflow.id} className="group flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl border border-transparent hover:border-outline-variant/10">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <h4 className="font-headline font-bold text-lg group-hover:underline underline-offset-4 decoration-1">
                                            {workflow.name}
                                        </h4>
                                        <p className="text-xs font-label text-on-surface-variant/70 uppercase tracking-tighter mt-1">
                                            Modified {formatDate(workflow.updatedAt || workflow.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12">
                                    <button 
                                    onClick={() => {
                                        deleteWorkflow.mutate({ id : workflow.id })
                                    }}
                                    disabled={deleteWorkflow.isPending}
                                    className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors hover:cursor-pointer">
                                        <DeleteIcon></DeleteIcon>
                                    </button>
                                    <button 
                                    onClick={() => {
                                        router.push(`/workflow/${workflow.id}`)
                                    }}
                                    className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors hover:cursor-pointer">
                                        <ArrowRightCircleIcon></ArrowRightCircleIcon>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pagination */}
                {workflows.data.totalPages > 0 && (
                    <Pagination 
                        page={params.page || 1} 
                        totalPages={workflows.data.totalPages}
                        isDisabled={workflows.isFetching}
                        onPageChange={(page) => setParams({ ...params, page })}
                    />
                )}
            </div>

            {/* System Footer Shell */}
            <footer className="mt-auto w-full py-12 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/30 dark:border-zinc-800/30">
                <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-4 font-headline text-[10px] uppercase tracking-widest">
                    <p className="text-zinc-400 dark:text-zinc-500">© 2024 Nodesmith. The Human Algorithm.</p>
                    <div className="flex gap-8">
                        <a className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 transition-opacity" href="#">Privacy Policy</a>
                        <a className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 transition-opacity" href="#">Terms of Service</a>
                        <a className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 transition-opacity" href="#">API Docs</a>
                        <a className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 transition-opacity" href="#">System Status</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}