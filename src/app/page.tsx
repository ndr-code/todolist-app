import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[40px_1fr_20px] items-center justify-items-center gap-10 bg-neutral-100 p-8 pb-20 sm:p-10'>
      <div className='flex h-10 w-full items-center justify-center bg-neutral-200 text-center font-bold'>
        Home
      </div>
      <Button>Start</Button>
      <div className='flex h-10 w-full items-center justify-center bg-neutral-200 text-center text-xs text-neutral-500'>
        © 2025 ndr. All rights reserved.
      </div>
    </div>
  );
}
