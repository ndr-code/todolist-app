import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui-basic/input';

import { useSearch } from '@/hooks/useSearch';

function SearchBar() {
  const { searchQuery, handleSearchChange, clearSearch } = useSearch();

  return (
    <div className='relative flex-1'>
      <Search className='text-muted-foreground absolute top-1/2 left-2 h-3 w-3 -translate-y-1/2 sm:left-3 sm:h-4 sm:w-4' />
      <Input
        placeholder='Search...'
        className='pr-8 pl-7 text-sm sm:pr-10 sm:pl-10 sm:text-base'
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className='text-muted-foreground hover:text-foreground absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 transition-colors sm:right-3 sm:h-4 sm:w-4'
        >
          <X className='h-3 w-3 sm:h-4 sm:w-4' />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
