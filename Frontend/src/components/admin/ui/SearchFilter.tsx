/**
 * Search and Filter Components
 * Reusable search bar with filter dropdowns
 */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: FilterOption[];
  onFilterChange?: (key: string, value: string) => void;
  activeFilters?: Record<string, string>;
}

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export const SearchFilter = ({
  searchValue,
  onSearchChange,
  placeholder = 'Search...',
  filters = [],
  onFilterChange,
  activeFilters = {},
}: SearchFilterProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchValue) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchValue, onSearchChange]);

  // Sync external changes
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
        {localSearch && (
          <button
            onClick={() => {
              setLocalSearch('');
              onSearchChange('');
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <select
              key={filter.key}
              value={activeFilters[filter.key] || ''}
              onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none cursor-pointer"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {hasActiveFilters && (
            <button
              onClick={() => {
                filters.forEach((f) => onFilterChange?.(f.key, ''));
              }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {totalItems !== undefined && itemsPerPage !== undefined && (
        <p className="text-sm text-slate-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </p>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1];
          const showEllipsis = prevPage && page - prevPage > 1;

          return (
            <span key={page} className="flex items-center">
              {showEllipsis && <span className="px-2 text-slate-400">...</span>}
              <button
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
