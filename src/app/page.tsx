"use client";
import { useRouter } from "next/navigation";
import Card from "@/components/card";
import { useQuery } from "@apollo/client";
import { GET_USER_COUNTS } from "@/gql";

export default function Home() {
  const { data, loading } = useQuery(GET_USER_COUNTS, {
    fetchPolicy: "network-only"
  });
  const router = useRouter();
  const { totalUserCount,
    userCount,
    artistCount,
    b2bCount,
    basicCount,
    premiumCount,
    goldCount,
    approvedArtistCount,
    unapprovedArtistCount } = data?.getUserCounts || {};

   const dashboardCount = [
      {
        title: "Total",
        count: totalUserCount,
        link: "/",
      },
      {
        title: "Users",
        count: userCount,
        link: "/",
      },
      {
        title: "Artists",
        count: artistCount,
        link: "/",
      },
      {
        title: "B2B",
        count: b2bCount,
        link: "/",
      },
      {
        title: "Unapproved artists",
        count: unapprovedArtistCount,
        link: "/unapproved-artist",
      },
      {
        title: "Approved artists",
        count: approvedArtistCount,
        link: "/",
      },
      {
        title: "Freemium users",
        count: basicCount,
        link: "/",
      },
      {
        title: "Premium users",
        count: premiumCount,
        link: "/",
      },
      {
        title: "Gold users",
        count: goldCount,
        link: "/",
      }
    ];
    

  return (
    <>
      {loading ? (
        <div className="p-6 text-center">
          <p>Loading Dashboard Count</p>
        </div>
      ) : (
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dashboardCount &&
            dashboardCount.length > 0 &&
            dashboardCount.map((dashboard, index) => (
              <Card key={index}>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => router.push(dashboard.link)}
                >
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                      {dashboard?.count ?? 0}
                    </span>
                    <h3 className="text-sm font-normal text-gray-500">
                      {dashboard.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </>
  );
}
