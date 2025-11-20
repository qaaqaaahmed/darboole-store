import { Separator } from "@/components/ui/separator";
import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextareaInput from "@/components/form/TextareaInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";

// Prisma.ProductScalarFieldEnum.

function CreatePage() {
  const productName = faker.commerce.product();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 25 });
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">Create Product</h2>
      <Separator />
      <div className="p-8 border rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <FormInput
              name="name"
              type="text"
              label="Product name"
              defaultValue={productName}
            />

            <FormInput
              name="company"
              type="text"
              label="company name"
              defaultValue={company}
            />

            <PriceInput />
            <ImageInput />
          </div>
          <TextareaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <div className="mt-6">
            <CheckboxInput label="featured" name="featured" />
          </div>

          <SubmitButton className="mt-6" text="create product" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreatePage;
