import { CartStore } from "@/type";
import { create } from "zustand";

// function areCustomizationsEqual(
//   a: CartCustomization[] = [],
//   b: CartCustomization[] = []
// ): boolean {
//   if (a.length !== b.length) return false;

//   const aSorted = [...a].sort((x, y) => x.id.localeCompare(y.id));
//   const bSorted = [...b].sort((x, y) => x.id.localeCompare(y.id));

//   return aSorted.every((item, idx) => item.id === bSorted[idx].id);
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],

//   addItem: (item) => {
//     const customizations = item.customizations ?? [];

//     const existing = get().items.find(
//       (i) =>
//         i.id === item.id &&
//         areCustomizationsEqual(i.customizations ?? [], customizations)
//     );

//     if (existing) {
//       set({
//         items: get().items.map((i) =>
//           i.id === item.id &&
//           areCustomizationsEqual(i.customizations ?? [], customizations)
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         ),
//       });
//     } else {
//       set({
//         items: [...get().items, { ...item, quantity: 1, customizations }],
//       });
//     }
//   },

//   removeItem: (id, customizations = []) => {
//     set({
//       items: get().items.filter(
//         (i) =>
//           !(
//             i.id === id &&
//             areCustomizationsEqual(i.customizations ?? [], customizations)
//           )
//       ),
//     });
//   },

//   increaseQty: (id, customizations = []) => {
//     set({
//       items: get().items.map((i) =>
//         i.id === id &&
//         areCustomizationsEqual(i.customizations ?? [], customizations)
//           ? { ...i, quantity: i.quantity + 1 }
//           : i
//       ),
//     });
//   },

//   decreaseQty: (id, customizations = []) => {
//     set({
//       items: get()
//         .items.map((i) =>
//           i.id === id &&
//           areCustomizationsEqual(i.customizations ?? [], customizations)
//             ? { ...i, quantity: i.quantity - 1 }
//             : i
//         )
//         .filter((i) => i.quantity > 0),
//     });
//   },

//   clearCart: () => set({ items: [] }),

//   getTotalItems: () =>
//     get().items.reduce((total, item) => total + item.quantity, 0),

//   getTotalPrice: () =>
//     get().items.reduce((total, item) => {
//       const base = item.price;
//       const customPrice =
//         item.customizations?.reduce(
//           (s: number, c: CartCustomization) => s + c.price,
//           0
//         ) ?? 0;
//       return total + item.quantity * (base + customPrice);
//     }, 0),
// }));

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);

    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [...get().items, { ...item, quantity: 1 }],
      });
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((i) => i.id !== id),
    });
  },

  increaseQty: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
  },

  decreaseQty: (id) => {
    set({
      items: get()
        .items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const base = item.price;

      return total + item.quantity * base;
    }, 0),

  getQuantityAndPrice: (id) => {
    const item = get().items.find((i) => i.id === id);
    return item
      ? { quantity: item.quantity, totalPrice: item.quantity * item.price }
      : { quantity: 1, totalPrice: 0 };
  },

  getAllItems: () => get().items,
}));
