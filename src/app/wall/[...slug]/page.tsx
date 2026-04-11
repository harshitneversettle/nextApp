"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface reviewData {
  name: string;
  email: string;
  eventId: string;
  userId: string;
  reviews: { review: string; stars: number; id: string }[];
}

const avatarPalettes = [
  { bg: "#1a1a2e", text: "#818cf8" },
  { bg: "#1a2e1a", text: "#4ade80" },
  { bg: "#2e1a1a", text: "#f87171" },
  { bg: "#2e2a1a", text: "#fbbf24" },
  { bg: "#1a2a2e", text: "#22d3ee" },
  { bg: "#2e1a2a", text: "#e879f9" },
];

const ReviewCard = ({ user, index }: { user: reviewData; index: number }) => {
  const review = user.reviews[0];
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const palette =
    avatarPalettes[user.name.charCodeAt(0) % avatarPalettes.length];

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: index % 5 === 0 ? "#1c1c1f" : "#141416",
        border: "1px solid #27272a",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={12}
            color={i < review.stars ? "#f59e0b" : "#3f3f46"}
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "#a1a1aa", fontStyle: "italic" }}
      >
        &ldquo;{review.review}&rdquo;
      </p>

      {/* User */}
      <div
        className="flex items-center gap-3 pt-2"
        style={{ borderTop: "1px solid #27272a" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: palette.bg, color: palette.text }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "#fafafa" }}
          >
            {user.name}
          </p>
          <p className="text-xs truncate" style={{ color: "#52525b" }}>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div
    className="rounded-2xl p-6 flex flex-col gap-4"
    style={{ background: "#141416", border: "1px solid #27272a" }}
  >
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm animate-pulse"
          style={{ background: "#27272a" }}
        />
      ))}
    </div>
    <div className="flex flex-col gap-2">
      <div
        className="h-3 rounded-full animate-pulse"
        style={{ background: "#27272a", width: "100%" }}
      />
      <div
        className="h-3 rounded-full animate-pulse"
        style={{ background: "#27272a", width: "80%" }}
      />
      <div
        className="h-3 rounded-full animate-pulse"
        style={{ background: "#27272a", width: "60%" }}
      />
    </div>
    <div
      className="flex items-center gap-3 pt-2"
      style={{ borderTop: "1px solid #27272a" }}
    >
      <div
        className="w-8 h-8 rounded-full animate-pulse"
        style={{ background: "#27272a" }}
      />
      <div className="flex flex-col gap-1 flex-1">
        <div
          className="h-3 rounded-full animate-pulse"
          style={{ background: "#27272a", width: "50%" }}
        />
        <div
          className="h-2 rounded-full animate-pulse"
          style={{ background: "#27272a", width: "70%" }}
        />
      </div>
    </div>
  </div>
);

export default function WallOfLove() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState<reviewData[]>([]);
  const [loading, setLoading] = useState(true);

  if (!slug || slug?.length < 2) return null;

  const eventName = slug[0];
  const adminId = slug[1];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post("/api/get-reviews", {
          adminId,
          eventName,
        });
        setReviews(res.data.data.allReviews);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const col1 = reviews.filter((_, i) => i % 3 === 0);
  const col2 = reviews.filter((_, i) => i % 3 === 1);
  const col3 = reviews.filter((_, i) => i % 3 === 2);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.reviews[0].stars, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-8"
          style={{
            background: "#1c1c1f",
            color: "#71717a",
            border: "1px solid #27272a",
          }}
        >
          <span style={{ color: "#f59e0b" }}>★</span>
          {avgRating} · {reviews.length} reviews
        </div>

        <h1
          className="text-5xl font-bold tracking-tight mb-3"
          style={{ color: "#fafafa", letterSpacing: "-0.03em" }}
        >
          Wall of Love
        </h1>
        <p className="text-base" style={{ color: "#52525b" }}>
          Real words from real people.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex gap-4 items-start">
            {[0, 1, 2].map((col) => (
              <div key={col} className="flex flex-col gap-4 flex-1">
                {[0, 1, 2].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="rounded-2xl p-16 text-center"
            style={{ background: "#141416", border: "1px solid #27272a" }}
          >
            <p style={{ color: "#3f3f46" }} className="text-sm">
              No reviews yet.
            </p>
          </div>
        ) : (
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-4 flex-1">
              {col1.map((u, i) => (
                <ReviewCard key={u.userId} user={u} index={i} />
              ))}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {col2.map((u, i) => (
                <ReviewCard key={u.userId} user={u} index={i} />
              ))}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {col3.map((u, i) => (
                <ReviewCard key={u.userId} user={u} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-10">
        <span className="text-xs" style={{ color: "#27272a" }}>
          Powered by YourApp
        </span>
      </div>
    </div>
  );
}
