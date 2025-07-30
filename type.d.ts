export interface CartCustomization {
  id: number;
  name: string;
  price: number;
}

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  getAllItems: () => CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getQuantityAndPrice: (id: number) => { quantity: number; totalPrice: number };
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  available: boolean;
  type: "Non-veg" | "Veg";
  imageUrl: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  available: boolean;
  type: "Non-veg" | "Veg";
  imageUrl: string;
  description: string;
  rating: string;
  tags: string[];
  price: string;
}

export interface Topping {
  id: number;
  name: string;
  price: number;
  available: boolean;
  imageUrl: string;
}

export interface SideOption {
  id: number;
  name: string;
  price: number;
  available: boolean;
  imageUrl: string;
}
