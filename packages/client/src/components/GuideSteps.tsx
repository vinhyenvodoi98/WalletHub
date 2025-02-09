import Image from 'next/image';

export default function GuideSteps() {

  const steps = [
    {
      id: 1,
      title: 'Login with Email',
      description: (
        <span>
          Visit{' '}
          <a
            href="https://dashboard.privy.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Privy Dashboard
          </a>
          {' '}to create a new app
        </span>
      ),
      image: {
        src: '/images/screen-guide-1.png',
        alt: 'Login screen example'
      }
    },
    {
      id: 2,
      title: 'Get API Key',
      description: 'Click to App Settings and get your API Key',
      instruction: 'You can click to Reset button to get a new API Key',
      image: {
        src: '/images/screen-guide-2.png',
        alt: 'Creating a new wallet'
      }
    },
    {
      id: 3,
      title: 'Copy API Key and set app config',
      description: 'Copy your API Key and set it in .env file then restart the app',
      instruction: 'copy and paste the API Key to .env file under the following variables',
      bullets: [
        'NEXT_PUBLIC_PRIVY_APP_ID=',
        'PRIVY_APP_ID=',
        'PRIVY_APP_SECRET='
      ]
    },
    {
      id: 4,
      title: 'Create a new wallet',
      description: 'Click the "Add New Wallet" button to create your first wallet.',
      instruction: 'To create a new wallet:',
      bullets: [
        'Go to your wallet page',
        'Click "Add New Wallet"',
      ],
    },
    {
      id: 5,
      title: 'Additional configuration',
      description: 'You can configure the policy of the wallet in the wallet page',
    }
  ];
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Getting Started Guide
      </h1>
      <div className="space-y-12">
        {steps.map((step) => (
          <div
            key={step.id}
            className='relative border rounded-xl p-6 border-gray-200 hover:border-gray-300 transition-colors'
          >

            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                {step.id}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>

                {step.instruction && (
                  <div className="mb-4">
                    <p className="text-gray-800 font-medium mb-2">
                      {step.instruction}
                    </p>
                    {step.bullets && (
                      <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                        {step.bullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {step.image && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
