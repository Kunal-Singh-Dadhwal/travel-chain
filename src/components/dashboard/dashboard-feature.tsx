'use client'

import { AppHero } from '../ui/ui-layout'


export default function DashboardFeature() {
  return (
    <div>
      <AppHero title="gm" subtitle="Say hi to your new Solana dApp." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <p>Here are some helpful links to get you started.</p>
        </div>
      </div>
    </div>
  )
}
