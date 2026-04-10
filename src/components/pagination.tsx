import { Button } from "./ui/button";

interface paginationProp {
    page : number;
    totalPages : number;
    onPageChange : (page : number) => void;
    isDisabled? : boolean
}

export const Pagination = ({
    page, 
    totalPages,
    onPageChange,
    isDisabled
}: paginationProp) => {
    return (
    <div>
        <div>
            {page} of {totalPages}
        </div>
        <div>
            <Button disabled={page == 1 || isDisabled}
                onClick={()=> {
                    onPageChange(Math.max(1, page - 1))
                } }
            >
                prev
            </Button>
            <Button disabled={page === totalPages || totalPages == 0 || isDisabled}
                onClick={() => {
                    onPageChange(Math.min(totalPages, page + 1))
                }}
            >
                next
            </Button>
        </div>
    </div>
    )
}
