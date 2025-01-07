'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import joinOrganizationIcon from '../../public/images/join-organization-icon.png';
import createOrganizationIcon from '../../public/images/create-organization-icon.png';
import Image from 'next/image';

export default function ChooseOrganizationPage() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex gap-8">
                {/* Create Organization Block */}
                <Card className="w-96 shadow-lg">
                    <CardHeader>
                        <CardTitle>Create Organization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image
                            src={createOrganizationIcon}
                            alt="Create Organization"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                        <p className="text-center mt-4">
                            Start your own organization and manage everything in
                            one place.
                        </p>
                        <Button
                            variant="default"
                            className="mt-6 w-full"
                            onClick={() => router.push('/create-organization')}
                        >
                            Create
                        </Button>
                    </CardContent>
                </Card>

                {/* Join Organization Block */}
                <Card className="w-96 shadow-lg">
                    <CardHeader>
                        <CardTitle>Join Organization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image
                            src={joinOrganizationIcon}
                            alt="Join Organization"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                        <p className="text-center mt-4">
                            Join an existing organization and collaborate with
                            your team.
                        </p>
                        <Button variant="default" className="mt-6 w-full">
                            Join
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
