export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-background/60 backdrop-blur-3xl py-12 mt-24 relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2 mb-4">
              Zaid<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground max-w-sm">
              Premium Excel automation, custom VBA development, and executive dashboard engineering for businesses looking to scale their operations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">Process</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:03291151550" className="hover:text-primary transition-colors">
                  0329 1151550
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zaid. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Engineered with precision.</p>
        </div>
      </div>
    </footer>
  );
}
