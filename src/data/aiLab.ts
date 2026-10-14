export type LabStatus = 'in-production' | 'in-development'

export interface LabExperiment {
  id: string
  title: string
  status: LabStatus
  summary: string
  tools: readonly string[]
  /** Links to a project id in projects.ts when a case study exists */
  projectId?: string
}

export const labIntro =
  'A working notebook for applied AI — detection models, datasets and the engineering needed to put them to use.'

export const labExperiments: readonly LabExperiment[] = [
  {
    id: 'wildlife-detection',
    title: 'Wildlife detection on CCTV footage',
    status: 'in-production',
    summary:
      'YOLOv8 object detection for wildlife monitoring, with datasets managed in Roboflow and training run on Google Colab.',
    tools: ['YOLOv8', 'Roboflow', 'Google Colab', 'CCTV'],
    projectId: 'wildlife-monitoring',
  },
  {
    id: 'aleenas-chat',
    title: "Aleena's Chat",
    status: 'in-development',
    summary: 'In development. Details will be shared once project assets are ready.',
    tools: [],
  },
  {
    id: 'avatar-studio',
    title: 'Avatar Studio',
    status: 'in-development',
    summary: 'In development. Details will be shared once project assets are ready.',
    tools: [],
  },
]

export interface PipelineStage {
  title: string
  description: string
}

export const pipelineStages: readonly PipelineStage[] = [
  { title: 'Collect', description: 'Source footage from CCTV cameras.' },
  { title: 'Annotate', description: 'Label and version datasets in Roboflow.' },
  { title: 'Train', description: 'Train and evaluate YOLOv8 models on Google Colab.' },
  { title: 'Detect', description: 'Run the trained model against footage.' },
  { title: 'Iterate', description: 'Review results, improve the dataset, retrain.' },
]

export const labToolkit: readonly string[] = ['YOLOv8', 'Roboflow', 'Google Colab', 'Python']

export const labPrinciples: readonly { title: string; text: string }[] = [
  {
    title: 'Data before models',
    text: 'Annotation quality and dataset versioning come first; architecture tweaks come second.',
  },
  {
    title: 'Pipelines, not notebooks',
    text: 'An experiment is only useful once it can run repeatedly on real input.',
  },
  {
    title: 'Honest evaluation',
    text: 'Review results on realistic footage rather than relying on a single headline number.',
  },
]
