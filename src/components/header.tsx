//will be used later


export default function Header() {
    return <div>
            <header className="fixed top-0 left-0 right-0 h-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl z-30 flex items-center justify-between px-12 border-b border-zinc-200/30">
                <div className="flex items-center gap-8">
                    <h2 className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 font-headline">
                        Nodesmith
                    </h2>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium font-headline tracking-tight">
                        <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 transition-all duration-300" href="#">Solutions</a>
                        <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 transition-all duration-300" href="#">Library</a>
                        <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 transition-all duration-300" href="#">Enterprise</a>
                        <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 transition-all duration-300" href="#">Pricing</a>
                    </nav>
                </div>
            </header>
    </div>
}