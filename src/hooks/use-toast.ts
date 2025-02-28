
import { toast as sonnerToast, type Toast } from "sonner";

export function toast(props: Toast) {
  sonnerToast(props.title, {
    description: props.description,
    action: props.action,
    position: "top-right",
    duration: props.duration ?? 4000,
    ...props,
  });
}
