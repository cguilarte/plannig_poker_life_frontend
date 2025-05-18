import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { BsCheck } from "react-icons/bs";

const checkbox = tv({
	slots: {
		base: "border-default-300 hover:bg-default-200 text-xs",
		content: " text-xs font-bold"
	},
	variants: {
		isSelected: {
			true: {
				base: "border-primary bg-primary hover:text-white hover:bg-primary-500 hover:border-primary-500",
				content: "text-white"
			}
		},
		isFocusVisible: {
			true: {
				base: "outline-none ring-2 text-white ring-focus ring-offset-2 ring-offset-background",
			}
		}
	}
})

export const CustomCheckbox = (props: any) => {
	const {
		children,
		isSelected,
		isFocusVisible,
		getBaseProps,
		getLabelProps,
		getInputProps,
	} = useCheckbox({
		...props
	})

	const styles = checkbox({ isSelected, isFocusVisible })

	return (
		<label  {...getBaseProps()}>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<Chip
				classNames={{
					base: styles.base(),
					content: styles.content(),
				}}
				color="primary"
				startContent={isSelected ? <BsCheck className="ml-1 text-white" /> : null}
				variant="bordered"
				{...getLabelProps()}
			>
				{children ? children : isSelected ? "Enabled" : "Disabled"}
			</Chip>
		</label>
	);
}
