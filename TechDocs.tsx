
import React from 'react';
import { ANDROID_CODE_SNIPPETS } from '../constants';
import { Code, BookOpen, Database, Layout as LayoutIcon, Settings } from 'lucide-react';

const TechDocs: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Technical Blueprint</h2>
        <p className="text-sm text-gray-500">Android Implementation Plan (MVP)</p>
      </div>

      <div className="space-y-8 pb-10">
        <DocSection title="Project Structure" icon={<LayoutIcon size={20} />}>
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
            <li><span className="font-bold text-gray-800">ui/</span>: Screen Composables (Map, Schedule, Profile)</li>
            <li><span className="font-bold text-gray-800">viewmodel/</span>: BusViewModel (Firebase & Location logic)</li>
            <li><span className="font-bold text-gray-800">service/</span>: LocationTrackingService (Foreground service)</li>
            <li><span className="font-bold text-gray-800">data/</span>: Models & Firebase Repositories</li>
          </ul>
        </DocSection>

        <DocSection title="Dependencies (build.gradle)" icon={<Settings size={20} />}>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-indigo-400 text-xs leading-relaxed mono">
{`// Maps & Compose
implementation "com.google.maps.android:maps-compose:2.11.4"
implementation "com.google.android.gms:play-services-maps:18.1.0"

// Firebase
implementation platform('com.google.firebase:firebase-bom:32.2.0')
implementation 'com.google.firebase:firebase-database-ktx'
implementation 'com.google.firebase:firebase-auth-ktx'

// Permissions & Navigation
implementation "com.google.accompanist:accompanist-permissions:0.30.1"
implementation "androidx.navigation:navigation-compose:2.6.0"`}
            </pre>
          </div>
        </DocSection>

        <DocSection title="AndroidManifest.xml" icon={<Code size={20} />}>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-gray-300 text-[10px] leading-relaxed mono">
              {ANDROID_CODE_SNIPPETS.manifest}
            </pre>
          </div>
        </DocSection>

        <DocSection title="BusViewModel (Kotlin)" icon={<Database size={20} />}>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-emerald-400 text-[10px] leading-relaxed mono">
              {ANDROID_CODE_SNIPPETS.viewModel}
            </pre>
          </div>
        </DocSection>

        <DocSection title="Firebase Node Structure" icon={<BookOpen size={20} />}>
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-amber-400 text-xs leading-relaxed mono">
              {ANDROID_CODE_SNIPPETS.firebaseJson}
            </pre>
          </div>
        </DocSection>
      </div>
    </div>
  );
};

const DocSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4 text-indigo-600">
      {icon}
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

export default TechDocs;
