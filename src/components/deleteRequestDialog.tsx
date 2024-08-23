import { deleteRequest } from "@/actions/adminRequest";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

export const DeleteRequestDialog = ({ id }: { id: number }) => {
  const DeletedeleteRequestWithId = deleteRequest.bind(null, id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Selected Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected request?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={DeletedeleteRequestWithId}>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
