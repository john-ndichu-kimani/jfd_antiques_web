import { notFound } from 'next/navigation';
import { ArtifactDetailPage } from '@/components/pages/ArtifactDetailPage';
import { featuredArtifacts } from '@/lib/data/artifacts';
import { Artifact } from '@/models/Artifact';

// Extend Artifact for ArtifactDetailPage
interface ArtifactWithImages extends Artifact {
  images: string[];
  culturalSignificance: string;
  material: string;
}

export default async function ArtifactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const artifact = featuredArtifacts.find((a) => a.id === Number(id)); // Convert id to number if needed
  if (!artifact) {
    notFound();
  }
  // Ensure images array exists, fallback to single image
  const artifactWithImages: ArtifactWithImages = {
    ...artifact,
    images: artifact.images || [artifact.image],
    culturalSignificance: artifact.culturalSignificance || 'A significant piece with deep historical roots.',
    material: artifact.material || 'Traditional materials',
  };
  return <ArtifactDetailPage artifact={artifactWithImages} />;
}