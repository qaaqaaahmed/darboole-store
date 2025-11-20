import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageContainer from "@/components/form/ImageContainer";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextareaInput from "@/components/form/TextareaInput";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";

async function EditPage({ params }: { params: { id: string } }) {
  const { name, company, price, description, featured, image } =
    await fetchAdminProductDetails(params.id);

  return (
    <section>
      <h1 className="text-2xl mb-8 capitalize font-semibold">Update product</h1>
      <div className="p-8 border rounded">
        <ImageContainer
          name={name}
          text="update image"
          image={image}
          action={updateProductImageAction}
        >
          <input type="hidden" name="id" value={params.id} />
          <input type="hidden" name="url" value={image} />
        </ImageContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid md:grid-cols-2 my-4 gap-4">
            <input type="hidden" name="id" value={params.id} />
            <FormInput
              name="name"
              type="text"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              name="company"
              type="text"
              label="company"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextareaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>

          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditPage;
