"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "@/features/products/api/delete-product";
import type { Product } from "@/types/product";

type Props = {
	product: Product;
	children: React.ReactNode;
};

export default function DeleteProductDialog({ product, children }: Props) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => deleteProduct(product.id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Product</AlertDialogTitle>

					<AlertDialogDescription>
						Are you sure you want to delete &quot;{product.name}&quot;? This action cannot
						be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<AlertDialogAction
						onClick={() => mutation.mutate()}
						className="bg-red-600 hover:bg-red-700">
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
