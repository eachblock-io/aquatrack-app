import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from '@/components/SettingsForm';

const SettingsPage = () => {
  return (
    <main className="w-11/12 mx-auto mt-10 ">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-x-6 lg:w-5/12">
          <TabsTrigger
            value="profile"
            className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
            Manage Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="pt-8">
          <h1 className='font-bold text-[--primary] mt-10 text-xl '>My Profile</h1>
          <SettingsForm />
        </TabsContent>
        <TabsContent value="account">{/* <ExpensesRecord /> */}</TabsContent>
      </Tabs>
    </main>
  );
}

export default SettingsPage
