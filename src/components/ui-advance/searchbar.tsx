import { Search } from 'lucide-react';

import { Input } from '@/components/ui-basic/input';

function SearchBar() {
  return (
    <div className='relative flex-1'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input placeholder='Search...' className='pl-10' />
    </div>
  );
}

export default SearchBar;
