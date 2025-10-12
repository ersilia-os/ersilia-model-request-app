"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ModelForm2() {
  return (
    <form>
      <FieldGroup>
        {/* section 1 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">
            Basic Identification
          </FieldLegend>
          <FieldDescription className="text-gray-400">
            Essential identifiers for the model. The slug and title are how
            users will find and reference this model in the system.
          </FieldDescription>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field orientation="horizontal">
                <FieldLabel className="text-plum/85">Slug</FieldLabel>
                <Input
                  placeholder="Enter a slug"
                  className="focus-visible:border-plum"
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel className="text-plum/85">Title</FieldLabel>
                <Input
                  className="focus-visible:border-plum"
                  placeholder="Enter a title"
                />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 2 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">
            Description & Interpretation
          </FieldLegend>
          <FieldDescription className="text-gray-400">
            Detailed information about what the model does and how to understand
            its results. Explain the model&apos;s purpose, methodology, and how
            to interpret its predictions.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel className="text-plum/85">Description</FieldLabel>
              <Textarea />
            </Field>
            <Field>
              <FieldLabel className="text-plum/85">Interpretation</FieldLabel>
              <Textarea />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 3 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">
            Classification & Tags
          </FieldLegend>
          <FieldDescription className="text-gray-400">
            Searchable labels that categorize the model. Select relevant tags
            from predefined categories to help users discover this model when
            searching by disease, organism, application, or other criteria.
          </FieldDescription>
          <FieldGroup></FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 4 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">
            Technical Specifications
          </FieldLegend>
          <FieldDescription className="text-gray-400">
            Define the model&apos;s input/output behavior and machine learning
            task type. This section describes the technical characteristics of
            how the model processes data.
          </FieldDescription>
          <FieldGroup></FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 5 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">Source & Licensing</FieldLegend>
          <FieldDescription className="text-gray-400">
            Attribution and legal information. Provide links to the original
            publication and code repository, along with licensing details and
            authorship information.
          </FieldDescription>
          <FieldGroup></FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 6 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">
            Deployment & Access
          </FieldLegend>
          <FieldDescription className="text-gray-400">
            Specify how and where the model can be run. Indicate whether the
            model executes locally on user machines, on Ersilia servers, or on
            external third-party servers.
          </FieldDescription>
          <FieldGroup></FieldGroup>
        </FieldSet>
        <FieldSeparator />
        {/* section 7 */}
        <FieldSet>
          <FieldLegend className="text-plum/90">Research Context</FieldLegend>
          <FieldDescription className="text-gray-400">
            Scientific domain and target organism information. Categorize the
            biomedical research area and specify which organisms (pathogens,
            hosts, or general applicability) the model relates to.
          </FieldDescription>
          <FieldGroup></FieldGroup>
        </FieldSet>
        <FieldSeparator />
      </FieldGroup>
    </form>
  );
}
