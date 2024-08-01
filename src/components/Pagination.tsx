import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  className?: string;
  path: string;
  currentPage: number;
  itemsPerPage: number;
  getCount: () => Promise<number>;
}

const Previous = () => (
  <span className="flex items-center gap-1">
    <ChevronLeft className="w-5 h-5" /> Previous
  </span>
);

const Next = () => (
  <span className="flex items-center gap-1">
    Next <ChevronRight className="w-5 h-5" />
  </span>
);

async function Pagination({ className, path, itemsPerPage, currentPage, getCount }: PaginationProps) {
  const count = await getCount();
  const showPrevious = currentPage > 1;
  const showNext = currentPage < Math.ceil(count / itemsPerPage);
  return (
    <ul className={cn(`flex justify-between items-center text-sm`, className)}>
      <li>
        {showPrevious ? (
          <Link
            href={{
              pathname: path,
              query: { page: currentPage - 1 }
            }}
          >
            <Previous />
          </Link>
        ) : (
          <span className="text-zinc-400">
            <Previous />
          </span>
        )}
        
      </li>

      {typeof count === 'number' && (
        <li className="flex-grow flex justify-center">
          <ul className="flex items-center gap-3">
            { [...new Array(Math.ceil(count / itemsPerPage))].map((_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  <Button asChild variant={page === currentPage ? 'default' : 'outline'} size="sm" className={`h-auto px-2.5 py-1`}>
                    <Link href={{
                      pathname: path,
                      query: { page }
                    }}>
                      { page }
                    </Link>
                  </Button>
                </li>
              )
            }) }
          </ul>
        </li>
      )}

      <li>
        {showNext ? (
          <Link
            href={{
              pathname: path,
              query: { page: currentPage + 1 }
            }}
          >
            <Next />
          </Link>
        ) : (
          <span className="text-zinc-400">
            <Next />
          </span>
        )}
      </li>
    </ul>
  )
}

export default Pagination;