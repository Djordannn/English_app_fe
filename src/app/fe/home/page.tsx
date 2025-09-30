"use client"
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from 'lucide-react' 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'


const Page = () => {
  return (
    <div className='px-[5%]'>
        {/* Navbar */}
        <nav className=' my-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>

                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg" alt="Brand logo" />
                  <AvatarFallback>BL</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='text-2xl font-semibold'>Hi Henry</h2>
                </div>
              </div>
                <div>
                  <a href="#"><Bell/></a>
                </div>
            </div>
        </nav>

        <div className=''>
            <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Let's Learning English
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Start your journey to master English with us!
                </p>
              </div>
            </section>
            
        </div>

        <div className='flex flex-col gap-4'>
        <Accordion type="single" collapsible className='bg-zinc-300 p-4 rounded-lg'>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-2xl'>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Easy to use for everyone</li>
                <li>Supports keyboard navigation</li>
                <li>Screen reader friendly</li>
              </ul>
              <hr className='my-4'/>
              <div>
        
          <Button>Let's try</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
          
        <Accordion type="single" collapsible className='bg-zinc-300 p-4 rounded-lg'>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-2xl'>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Easy to use for everyone</li>
                <li>Supports keyboard navigation</li>
                <li>Screen reader friendly</li>
              </ul>
              <hr className='my-4'/>
              <div>
        
          <Button>Let's try</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
          
        <Accordion type="single" collapsible className='bg-zinc-300 p-4 rounded-lg'>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-2xl'>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Easy to use for everyone</li>
                <li>Supports keyboard navigation</li>
                <li>Screen reader friendly</li>
              </ul>
              <hr className='my-4'/>
              <div>
        
          <Button>Let's try</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>

    </div>
  )
}

export default Page
