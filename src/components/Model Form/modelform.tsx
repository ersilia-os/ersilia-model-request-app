"use client";

import { useEffect, useRef, useState } from "react";

const allTags = [
  "AIDS",
  "Alzheimer",
  "Cancer",
  "Cardiotoxicity",
  "Cytotoxicity",
  "COVID19",
  "Dengue",
  "Malaria",
  "Neglected tropical disease",
  "Schistosomiasis",
  "Tuberculosis",
  "A.baumannii",
  "E.coli",
  "E.faecium",
  "HBV",
  "HIV",
  "Human",
  "K.pneumoniae",
  "Mouse",
  "M.tuberculosis",
  "P.aeruginosa",
  "P.falciparum",
  "Rat",
  "Sars-CoV-2",
  "S.aureus",
  "ESKAPE",
  "BACE",
  "CYP450",
  "GPCR",
  "hERG",
  "Fraction bound",
  "IC50",
  "Half-life",
  "LogD",
  "LogP",
  "LogS",
  "MIC90",
  "Molecular weight",
  "Papp",
  "pKa",
  "ADME",
  "Antimicrobial activity",
  "Antiviral activity",
  "Bioactivity profile",
  "Lipophilicity",
  "Metabolism",
  "Microsomal stability",
  "Natural product",
  "Price",
  "Quantum properties",
  "Side effects",
  "Solubility",
  "Synthetic accessibility",
  "Target identification",
  "Therapeutic indication",
  "Toxicity",
  "ChEMBL",
  "DrugBank",
  "MoleculeNet",
  "Tox21",
  "ToxCast",
  "ZINC",
  "TDCommons",
  "Chemical graph model",
  "Chemical language model",
  "Chemical notation",
  "Chemical synthesis",
  "Compound generation",
  "Descriptor",
  "Drug-likeness",
  "Embedding",
  "Fingerprint",
  "Similarity",
];

const licenses = [
  "MIT",
  "GPL-3.0-only",
  "GPL-3.0-or-later",
  "LGPL-3.0-only",
  "LGPL-3.0-or-later",
  "AGPL-3.0-only",
  "AGPL-3.0-or-later",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "MPL-2.0",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "Proprietary",
  "Non-commercial",
  "No-license",
];

const exampleModel = {
  id: 2,
  title: "ChemFH chemical frequent hitter detection",
  slug: "chemfh",
  description:
    "Random forest classifier designed to identify promiscuous compounds that show activity across multiple unrelated assays. Trained on 450,000 screening results from PubChem BioAssay with balanced positive and negative examples. Model demonstrates 88% precision and 85% recall in detecting frequent hitters, helping prioritize genuine drug candidates over non-specific binders in early drug discovery.",
  tags: ["Drug-likeness", "Bioactivity profile", "Target identification", "ADME"],
  publication: "https://doi.org/10.1021/acs.jcim.4c00156",
  sourceCode: "https://github.com/rodriguez-lab/chemfh-detector",
  license: "Apache-2.0",
};

const MAX_TAGS = 5;

type ModelMetadataFormProps = {
  identifier?: string;
};

export default function ModelMetadataForm({
  identifier = String(exampleModel.id),
}: ModelMetadataFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(exampleModel.tags);
  const [tagError, setTagError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectDisabled = selectedTags.length >= MAX_TAGS;

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (selectDisabled) {
      setIsMenuOpen(false);
    }
  }, [selectDisabled]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setTagError("Tag already selected.");
      return;
    }

    if (selectedTags.length >= MAX_TAGS) {
      setTagError("You can select up to 5 tags.");
      return;
    }

    const updated = [...selectedTags, tag];
    setSelectedTags(updated);
    setTagError("");
    setSubmitError("");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (selectDisabled) {
      return;
    }

    setIsMenuOpen((previous) => !previous);
    setTagError("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updated);
    setTagError("");
    setSubmitError("");
  };

  const handleSubmit = () => {
    if (selectedTags.length === 0) {
      setSubmitError("Pick at least one tag before saving.");
      return;
    }

    setSubmitError("");

  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium">
          Identifier
        </label>
        <input
          id="identifier"
          name="identifier"
          value={identifier}
          readOnly
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={exampleModel.slug}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags (pick 1 to 5)
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Selected {selectedTags.length}/{MAX_TAGS}
        </p>
        <div className="relative mt-2" ref={dropdownRef}>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded border px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-60"
            onClick={toggleMenu}
            disabled={selectDisabled}
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
          >
            <span>{selectDisabled ? "Tag limit reached" : "Select a tag"}</span>
            <span aria-hidden="true">▾</span>
          </button>

          {isMenuOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded border bg-white shadow"
              role="listbox"
            >
              {allTags.map((tag) => {
                const disabled = selectedTags.includes(tag);

                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      disabled={disabled}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-plum/10 disabled:cursor-not-allowed disabled:text-gray-400"
                      role="option"
                      aria-disabled={disabled}
                    >
                      {tag}
                      {disabled && <span className="text-xs">Added</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 rounded-full bg-plum/10 px-3 py-1 text-xs text-plum"
            >
              {tag}
              <button
                type="button"
                className="text-plum underline"
                onClick={() => handleRemoveTag(tag)}
              >
                Remove
              </button>
            </span>
          ))}
        </div>

        {selectDisabled && (
          <p className="mt-1 text-xs text-gray-500">
            Maximum of 5 tags selected. Remove one to add another.
          </p>
        )}

        {tagError && <p className="mt-1 text-xs text-rose-500">{tagError}</p>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={exampleModel.title}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={exampleModel.description}
          className="mt-1 h-32 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="publication" className="block text-sm font-medium">
          Publication
        </label>
        <input
          id="publication"
          name="publication"
          type="url"
          defaultValue={exampleModel.publication}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="sourceCode" className="block text-sm font-medium">
          Source Code
        </label>
        <input
          id="sourceCode"
          name="sourceCode"
          type="url"
          defaultValue={exampleModel.sourceCode}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="license" className="block text-sm font-medium">
          License
        </label>
        <select
          id="license"
          name="license"
          defaultValue={exampleModel.license}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="">Select a license</option>
          {licenses.map((license) => (
            <option key={license} value={license}>
              {license}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right">
        {submitError && (
          <p className="mb-2 text-sm text-rose-500">{submitError}</p>
        )}
        <button
          type="button"
          className="rounded bg-plum px-4 py-2 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
