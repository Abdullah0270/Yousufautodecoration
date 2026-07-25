import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number | string;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    
    <div className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Category */}

        <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
          {product.category.name}
        </span>

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        <h3 className="line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-orange-500">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Starting Price
            </p>

            <p className="text-3xl font-extrabold text-orange-500">
              Rs. {Number(product.price).toLocaleString()}
            </p>

          </div>

        </div>

        <Link
          href={`/products/${product.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          View Details
          <span>→</span>
        </Link>

      </div>

    </div>
  
  );
}