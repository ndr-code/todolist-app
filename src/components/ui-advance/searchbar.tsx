import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui-basic/input';

import { useSearch } from '@/hooks/useSearch';

function SearchBar() {
  const { searchQuery, handleSearchChange, clearSearch } = useSearch();

  return (
    <div className='relative flex-1'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input
        placeholder='Search...'
        className='pr-10 pl-10'
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transition-colors'
        >
          <X className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
