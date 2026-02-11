export function Footer() {
  return (
    <footer className="border-t border-[var(--gray-3)]">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-6 lg:px-0">
        <p className="text-[12px] text-[var(--gray-6)]">
          &copy; {new Date().getFullYear()} Uday Kiran Peraboina
        </p>
      </div>
    </footer>
  );
}
