import { deleteRequest } from "@/actions/adminrequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DeleteRequestDialog = ({ id }: { id: number }) => {
  const DeletedeleteRequestWithId = deleteRequest.bind(null, id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <label htmlFor="">Delete</label>
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
