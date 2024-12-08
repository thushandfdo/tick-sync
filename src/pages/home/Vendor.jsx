import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, PrimaryButton, Section, TextBox } from '../../components';

const schema = yup.object({
    ticketReleaseRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Ticket Release Rate must be a number'),
    maxTicketCapacity: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Max Ticket Capacity must be a number')
});

const Vendor = ({ isOn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('Select Vendor');
    const [newVendor, setNewVendor] = useState('');
    const [isVendorNameError, setIsVendorNameError] = useState(false);

    useEffect(() => {
        setVendors(['Vendor 1', 'Vendor 2', 'Vendor 3']);
    }, []);

    useEffect(() => {
        if (newVendor) {
            setIsVendorNameError(false);
        }
    }, [newVendor]);

    const handleAddVendor = () => {
        if (!newVendor) {
            setIsVendorNameError(true);
            return;
        }
        alert('Vendor added: ' + newVendor);
    };

    const handleSaveConfigurations = (data) => {
        alert('Configurations saved: ' + JSON.stringify(data));
    };

    return (
        <div className="w-10/12 mx-auto my-5">
            <Section title="Add new Vendor" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Vendor Name:</Label>
                    <TextBox value={newVendor} onChange={(e) => setNewVendor(e.target.value)} />
                    <PrimaryButton text="Add Vendor" onClick={handleAddVendor} disabled={!isOn} />
                    {isVendorNameError && <Label variant="error">Vendor name is required</Label>}
                </div>
            </Section>

            <Section title="Set Vendor Configurations">
                <div className="flex items-center gap-2">
                    <Label>Select Vendor:</Label>
                    <Dropdown
                        items={vendors}
                        selectedItem={selectedVendor}
                        setSelectedItem={setSelectedVendor}
                    />
                </div>

                <hr className="h-0.5 my-5 bg-gray-300 border-0" />
                <Label variant="h3">Vendor Configurations:</Label>

                <form className="ml-4 grid grid-cols-[200px_1fr] gap-4 mb-2">
                    <Label>Ticket Release Rate:</Label>
                    <TextBox
                        name="ticketReleaseRate"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />

                    <Label>Max Ticket Capacity:</Label>
                    <TextBox
                        name="maxTicketCapacity"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />
                </form>

                <PrimaryButton
                    text="Save Configurations"
                    onClick={handleSubmit((data) => handleSaveConfigurations(data))}
                    disabled={!isOn}
                />
            </Section>
        </div>
    );
};

export default Vendor;
