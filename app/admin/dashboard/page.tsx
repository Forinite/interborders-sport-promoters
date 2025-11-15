// app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { client } from '@/sanity/lib/client';
import { STORIES_QUERY, EVENTS_QUERY, NEWS_QUERY, RESOURCES_QUERY } from '@/lib/queries';
import { format } from 'date-fns';
import { Activity, TrendingUp, Users, Globe, Clock, AlertCircle } from 'lucide-react';
import {Story} from "@/types";

export default async function DashboardPage() {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) redirect('/admin/login');

    // Fetch all data in parallel
    const [stories, events, news, resources] = await Promise.all([
        client.fetch(STORIES_QUERY).catch(() => []),
        client.fetch(EVENTS_QUERY).catch(() => []),
        client.fetch(NEWS_QUERY).catch(() => []),
        client.fetch(RESOURCES_QUERY).catch(() => []),
    ]);

    const totalStories = stories.length;
    const featuredStories= stories.filter(s => s.featured).length;
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
    const totalEvents = events.length;
    const recentNews = news.filter(n => n.publishedAt && new Date(n.publishedAt) > new Date(Date.now() - 7*24*60*60*1000)).length;
    const totalResources = resources.length;

    const today = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter(e => e.date?.startsWith(today)).length;

    return (
        <div className="space-y-8">

            {/* HUD Command Header */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-6">

                    {/* Left: Core Intel */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900">Global Command</h1>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white text-xs font-bold rounded-md shadow-sm">
          <Activity className="h-3.5 w-3.5" />
          LIVE
        </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                            Real-time operations across <span className="font-semibold text-[#0A84FF]">the globe</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            Last update: {format(new Date(), 'HH:mm:ss')}
                        </p>
                    </div>

                    {/* Right: Total Count */}
                    <div className="text-right">
                        <p className="text-3xl font-black text-[#0A84FF]">
                            {totalStories + totalEvents + news.length + totalResources}
                        </p>
                        <p className="text-xs text-slate-600 font-medium">Total Content</p>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Stories */}
                <div className="relative group">
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                    <div className="relative bg-white rounded-2xl border border-[#CBD5E1] p-6 shadow-sm transition-all group-hover:shadow-lg group-hover:translate-y-[-4px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-slate-600">Success Stories</h3>
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </div>
                        <p className="text-3xl font-black text-slate-900">{totalStories}</p>
                        <p className="text-xs text-slate-500 mt-1">
                            {featuredStories} featured • {totalStories - featuredStories} draft
                        </p>
                    </div>
                </div>

                {/* Events */}
                <div className="relative group">
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                    <div className="relative bg-white rounded-2xl border border-[#CBD5E1] p-6 shadow-sm transition-all group-hover:shadow-lg group-hover:translate-y-[-4px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-slate-600">Events</h3>
                            {todayEvents > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  TODAY
                </span>
                            )}
                        </div>
                        <p className="text-3xl font-black text-slate-900">{totalEvents}</p>
                        <p className="text-xs text-slate-500 mt-1">
                            {upcomingEvents} upcoming • {totalEvents - upcomingEvents} past
                        </p>
                    </div>
                </div>

                {/* News */}
                <div className="relative group">
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                    <div className="relative bg-white rounded-2xl border border-[#CBD5E1] p-6 shadow-sm transition-all group-hover:shadow-lg group-hover:translate-y-[-4px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-slate-600">News Dispatch</h3>
                            {recentNews > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                  <Activity className="h-3 w-3" />
                                    {recentNews} NEW
                </span>
                            )}
                        </div>
                        <p className="text-3xl font-black text-slate-900">{news.length}</p>
                        <p className="text-xs text-slate-500 mt-1">
                            {recentNews} in last 7 days
                        </p>
                    </div>
                </div>

                {/* Resources */}
                <div className="relative group">
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                    <div className="relative bg-white rounded-2xl border border-[#CBD5E1] p-6 shadow-sm transition-all group-hover:shadow-lg group-hover:translate-y-[-4px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-slate-600">Knowledge Vault</h3>
                            <Globe className="h-4 w-4 text-[#0A84FF]" />
                        </div>
                        <p className="text-3xl font-black text-slate-900">{totalResources}</p>
                        <p className="text-xs text-slate-500 mt-1">
                            PDFs, videos, guides
                        </p>
                    </div>
                </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Live Activity</h2>
                <div className="space-y-3 text-sm">
                    {todayEvents > 0 && (
                        <div className="flex items-center gap-3 text-orange-600">
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                            <span className="font-medium">{todayEvents} event{todayEvents > 1 ? 's' : ''} happening now</span>
                        </div>
                    )}
                    {recentNews > 0 && (
                        <div className="flex items-center gap-3 text-emerald-600">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                            <span className="font-medium">{recentNews} new article{recentNews > 1 ? 's' : ''} published</span>
                        </div>
                    )}
                    <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-2 h-2 bg-slate-400 rounded-full" />
                        <span>System stable • online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}