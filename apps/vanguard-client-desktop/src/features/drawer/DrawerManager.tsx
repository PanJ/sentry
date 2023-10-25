import classNames from "classnames";
import {atom, useAtomValue} from "jotai";
import {ActionsRequiredModal} from "../home/modals/actions-required/ActionsRequiredModal";
import {BuyKeysModal} from "../keys/modals/buy-keys/BuyKeysModal";
import {ViewKeysModal} from "../home/modals/view-keys/ViewKeysModal";

export enum DrawerView {
	ActionsRequired,
	BuyKeys,
	ViewKeys,
}

export const drawerStateAtom = atom<DrawerView | null>(null);

export function DrawerManager() {
	const drawerState = useAtomValue(drawerStateAtom);

	return (
		<div
			className={classNames("w-[28rem] min-w-[28rem] h-screen relative z-10", {
				"hidden": drawerState === null,
			})}
		>
			{drawerState === DrawerView.ActionsRequired && (
				<ActionsRequiredModal/>
			)}

			{drawerState === DrawerView.BuyKeys && (
				<BuyKeysModal/>
			)}

			{drawerState === DrawerView.ViewKeys && (
				<ViewKeysModal/>
			)}
		</div>
	);
}
