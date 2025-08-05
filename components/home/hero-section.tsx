'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative">
        <motion.div
          className="flex flex-col items-center text-center py-24 lg:py-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-8"
          >
            <Heart className="mr-2 h-4 w-4 fill-current" />
            100leşme Yolculuğu
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6"
          >
            <span className="gradient-text">
              Kendimle
            </span>
            <br />
            <span className="text-muted-foreground">
              100leşme Hikayem
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10 leading-relaxed"
          >
            Ben Seda. 100leşme yolculuğunun yazarı, yürüyeni ve en çok da tanığıyım. 
            Bu blog, kendisiyle karşılaşmaya cesaret edenlerin sesi, kaybolduklarında 
            yeniden yön bulanların haritası.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="gradient"
              className="group btn-hover-lift"
            >
              <Link href="/blog">
                Yazıları Keşfet
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="glass"
              className="btn-hover-lift"
            >
              <Link href="/about">
                Hakkımda
              </Link>
            </Button>
          </motion.div>

          {/* Personal Quote */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 p-6 glass rounded-2xl max-w-2xl"
          >
            <blockquote className="text-lg italic text-center">
              <p className="mb-4">
                "Bu hayat gerçekten benim mi? sorusuyla başlayan bir içsel kalkışma..."
              </p>
              <footer className="text-sm text-muted-foreground">
                — Seda Tokmak
              </footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
