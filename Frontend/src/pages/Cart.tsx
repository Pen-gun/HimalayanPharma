import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { ProductSkeletonGrid } from '../components/Skeleton.tsx';

const Cart = () => {
  const { cart, isLoading, removeFromCart, addToCart, clearCart } = useCart();

  useEffect(() => {
    document.title = 'Shopping Cart | Himalayan Pharma Works';
  }, []);

  if (isLoading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <ProductSkeletonGrid count={3} />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="section-shell space-y-8">
        <SectionHeader
          eyebrow="Shopping Cart"
          title="Your cart is empty"
          subtitle="Add some products to get started"
          align="center"
        />
        <div className="flex justify-center">
          <Link to="/products" className="btn-primary">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="section-shell space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeader
          eyebrow="Shopping Cart"
          title={`${cart.items.length} item${cart.items.length !== 1 ? 's' : ''} in your cart`}
        />
        <button
          onClick={clearCart}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          <Trash2 className="mr-1 inline h-4 w-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex gap-4 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm"
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-emerald-900">{item.productId.name}</h3>
                  <p className="text-sm text-slate-600">₹{item.productId.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-slate-300">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? addToCart(item.productId._id, -1)
                          : removeFromCart(item.productId._id)
                      }
                      className="p-2 hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.productId._id, 1)}
                      className="p-2 hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col items-end font-semibold text-emerald-900">
                ₹{(item.productId.price * item.quantity).toFixed(2)}
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="absolute bottom-5 right-5 text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-emerald-100 bg-white p-6 shadow-lg lg:sticky lg:top-24">
          <h3 className="mb-4 text-lg font-semibold text-emerald-900">Order Summary</h3>
          <div className="space-y-3 border-b border-slate-200 pb-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="text-emerald-700">FREE</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold text-emerald-900">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary mt-6 w-full">Proceed to Checkout</button>
          <Link
            to="/products"
            className="mt-3 block text-center text-sm font-semibold text-emerald-700 hover:text-emerald-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
