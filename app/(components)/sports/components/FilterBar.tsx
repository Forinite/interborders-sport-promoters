// app/(components)/sports/components/FilterBar.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function FilterBar() {
    return (
        <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search events or news..." className="pl-10" />
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Sport" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="athletics">Athletics</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="ph">Port Harcourt</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                    <Calendar className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>
        </div>
    );
}