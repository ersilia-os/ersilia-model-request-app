// schema-descriptions.ts

export const SCHEMA_DESCRIPTIONS = {
  isBiomedicalModel:
    "Identify if this is a scientific publication that describes a biomedical model.",

  slug: "A short, descriptive URL-friendly identifier derived from the title, using hyphens instead of spaces. RULES: (1) All lowercase, max 50 characters, max 5 hyphens. (2) PRIORITIZE disease area, pathogen, or application over generic terms like 'deep-learning' or 'ml'. (3) If the method has a known name (e.g., ChemProp, DeepChem), include it. (4) Mention pathogen/disease when relevant (e.g., 'chemprop-abaumannii' for ChemProp trained on Acinetobacter baumannii data). (5) Include well-known dataset names when applicable (e.g., 'chembl', 'tdc'). (6) Avoid generic adverbs and prepositions (e.g., 'for', 'using'). (7) Do not include dates or author names. EXAMPLES: 'chemprop-abaumannii' (method + pathogen), 'malaria-drug-resistance' (disease + application), 'chembl-toxicity-predictor' (dataset + task), 'tuberculosis-compound-screening' (pathogen + task). Focus on making the slug informative about what the model does and what it targets, not how it does it.",

  title:
    "A concise, informative title for the computational tool (10-300 characters). The title should be coherent with the publication title and can be inspired by the raw metadata. PREFERRED STRUCTURE: '[Method/Approach] for [Application/Target]' when applicable (e.g., 'UMAP dimensionality reduction for chemical space visualization', 'Graph neural networks for tuberculosis drug discovery', 'Transformer-based embeddings for ADMET prediction'). However, this structure is NOT mandatory—use what best describes the model. GUIDELINES: (1) Be specific about the application, disease, or pathogen when relevant. (2) Avoid overly generic terms. (3) Balance technical accuracy with clarity. (4) If the original paper has a clear method name, consider incorporating it. (5) Focus on what the model does and what it targets, not just the technique used.",

  description:
    "A comprehensive summary of the computational tool in ONE paragraph (minimum 200 characters). MUST INCLUDE: (1) The computational approach/method used. (2) The specific application, disease area, pathogen, or biological target. (3) Training data details when available: dataset size (number of compounds/samples), data sources (e.g., ChEMBL, PubChem), and key characteristics (e.g., activity ranges, diversity). (4) Whether the model has been prospectively validated with experimental results (mention if predictions were experimentally tested). (5) Key performance metrics if reported (e.g., accuracy, AUC, R²). STRUCTURE: Start with what the model does and its target application, describe the methodology and training data, then mention validation and performance. Be specific about the biological context—prioritize mentioning pathogens (e.g., Plasmodium falciparum, Mycobacterium tuberculosis) or disease areas (e.g., malaria, cancer) over generic descriptions. Write in a clear, informative style suitable for researchers.",

  interpretation:
    "A concise explanation (max 150 characters) of how to interpret the model's output. Specify: (1) The output type (e.g., probability, IC50 value, binary classification, regression score, descriptor). (2) Decision thresholds or cutoffs when specified in the publication (e.g., 'score >0.4 indicates active compound', 'IC50 <10 μM considered active'). (3) The biological/experimental context of the output. EXAMPLES: 'Probability of activity; >0.4 considered active by authors', 'IC50 in μM; <10 μM indicates potent inhibition', 'Binary classification; 1=active (IC50 <10 μM), 0=inactive', 'Permeability coefficient in log units; higher values = faster permeation'. Be specific and actionable—users should understand what the numbers mean and how to use them for decision-making.",

  tags: (allowedTags: string[]) =>
    "MUST BE AN ARRAY. Select 1-5 relevant tags from this list ONLY: " +
    allowedTags.join(", ") +
    ". Select tags from multiple categories when applicable: (1) Disease/condition (e.g., Malaria, Tuberculosis, Cancer). (2) Specific pathogen/organism (e.g., P.falciparum, E.coli, M.tuberculosis—select ONLY the exact organism(s) the model targets). (3) Biological target/protein (e.g., hERG, CYP450, BACE). (4) Molecular property/endpoint (e.g., IC50, Solubility, Toxicity, Permeability). (5) Data source (e.g., ChEMBL, TDCommons). (6) Computational method (e.g., Chemical graph model, Embedding, Fingerprint). Be specific: if a model is for E.coli, do NOT also tag other bacteria unless they are explicitly included. Use EXACT matches. Do not create new tags. If uncertain, use [].",

  publication_url:
    "Link to the original publication. Prefer the journal page (DOI link) over PubMed, ResearchGate or other secondary sources. Format: full URL starting with https://. If not found in the PDF, leave empty.",

  source_url:
    "Full URL to the model source. ACCEPTED FORMATS: (1) Code repository URL (GitHub, GitLab, Bitbucket, etc.) - must be complete repository URL (e.g., 'https://github.com/username/repo-name', NOT just 'https://github.com'). (2) Web application or web server hosting the model (e.g., 'https://example.com/model-tool'). (3) Third-party REST API endpoint documentation page. PRIORITY: Prefer code repositories over web apps when both are available. If the exact source URL is not found in the PDF, leave empty rather than providing an incomplete or generic URL (e.g., do not use just domain names without specific paths).",

  license: (allowedLicenses: string[]) =>
    "License of the original code using SPDX abbreviations. Valid options: " +
    allowedLicenses.join(", ") +
    ". Extract from the code repository (typically in LICENSE file, README, or repository metadata) or from the paper. Use 'None' ONLY if explicitly stated that there is no license. Use 'Proprietary' for commercial/closed-source software. If the license is unclear or not mentioned, leave empty.",

  deployment:
    "Model availability for inference. Valid options: 'Local' (runs on user's computer), 'Online' (available via Ersilia servers). Use 'Local' as default if unclear.",

  source_type:
    "Origin of the model. Valid options: 'External' (third-party model from published research), 'Internal' (developed by Ersilia team), 'Replicated' (re-trained using original author's guides). Most models are 'External'.",

  task: (allowedTasks: string[]) =>
    "The ML task performed by the model. Choose ONLY from: " +
    allowedTasks.join(", ") +
    ". Select the most relevant one based on the model's primary purpose. Use exact matches only.",

  subtask: (allowedSubtasks: string[]) =>
    "More granular task description. Choose ONLY from: " +
    allowedSubtasks.join(", ") +
    ". Match to the main task selected. Use exact matches only. If uncertain, leave empty.",

  input: "This is always 'Compound'",

  input_dimension: "This is always '1'",

  output: (allowedOutputs: string[]) =>
    "MUST BE AN ARRAY. Data type(s) outputted by the model. Choose ONLY from: " +
    allowedOutputs.join(", ") +
    ". Can select multiple if the model outputs different types. Examples: ['Value'], ['Probability', 'Score'], []. Use exact matches only. If uncertain, use [].",

  output_dimension:
    "Length of the output per each input compound. For single predictions use '1'. For binary classification use '1' or '2' (depending on output format). For multi-class classification, count the number of classes. For multiple descriptors, count the number of output values. Extract from the paper's methods or results section. If uncertain, leave empty.",

  output_consistency: (allowedConsistency: string[]) =>
    "Whether the model produces the same prediction given the same input. Choose ONLY from: " +
    allowedConsistency.join(", ") +
    ". Use 'Fixed' for most predictive models (classification, regression, property prediction). Use 'Variable' ONLY for generative models that produce different outputs on each run (e.g., molecule generators, variational models with sampling, stochastic generative architectures). Use exact matches only. If uncertain, use 'Fixed'.",

  publication_type: (allowedTypes: string[]) =>
    "Type of publication. Choose ONLY from: " +
    allowedTypes.join(", ") +
    ". Use exact matches only. If uncertain, leave empty.",

  publication_year:
    "Year of publication of the original model. Extract from the publication date. Format: 4-digit year (e.g., '2023'). If not found, leave empty.",

  biomedical_area: (allowedAreas: string[]) =>
    "MUST BE AN ARRAY. The pertinent area of research or disease targeted. Choose ONLY from: " +
    allowedAreas.join(", ") +
    ". Can select multiple if relevant (e.g., both ADMET and Malaria). Use 'Any' for general-purpose models. Use exact matches only. If uncertain, use [].",

  target_organism: (allowedOrganisms: string[]) =>
    "MUST BE AN ARRAY. The pathogen or organism the model is related to. Choose ONLY from: " +
    allowedOrganisms.join(", ") +
    ". Can select multiple organisms. Use 'Any' if the model is unrelated to any specific organism. Use exact matches only. If uncertain, use [].",
} as const;
