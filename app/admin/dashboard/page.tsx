// app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import StoriesList from './stories/StoriesList';
import StoriesPage from "@/app/admin/dashboard/stories/page";
// import EventsList from './sports/EventsList';
// import NewsList from './sports/NewsList';
// import ResourcesList from './counselling/ResourcesList';

export default async function DashboardPage() {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) redirect('/admin/login');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage all content for YouthSportNG</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Stories</h3>
                    <p className="text-2xl font-bold mt-2">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-muted-foreground">Upcoming Events</h3>
                    <p className="text-2xl font-bold mt-2">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-muted-foreground">News Articles</h3>
                    <p className="text-2xl font-bold mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-muted-foreground">Resources</h3>
                    <p className="text-2xl font-bold mt-2">18</p>
                </div>
            </div>

            {/*<div className="grid gap-8 lg:grid-cols-2">*/}
            {/*    <StoriesPage  />*/}
            {/*    /!*<EventsList />*!/*/}
            {/*    /!*<NewsList />*!/*/}
            {/*    /!*<ResourcesList />*!/*/}
            {/*</div>*/}
        </div>
    );
}