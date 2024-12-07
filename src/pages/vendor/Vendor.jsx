import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, PrimaryButton, Section, TextBox } from '../../components';

const schema = yup.object({
    totalTickets: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Total Tickets must be a number'),
    ticketReleaseRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Ticket Release Rate must be a number'),
    customerRetrievalRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Customer Retrieval Rate must be a number'),
    maxTicketCapacity: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Max Ticket Capacity must be a number')
});

const Vendor = () => {
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

    useEffect(() => {
        setVendors(['Vendor 1', 'Vendor 2', 'Vendor 3']);
    }, []);

    const handleAddVendor = () => {
        alert('Vendor added: ' + newVendor);
    };

    const handleSaveConfigurations = (data) => {
        alert('Configurations saved: ' + JSON.stringify(data));
    };

    return (
        <div className="flex items-center h-screen">
            <div className="w-10/12 mx-auto my-5">
                <Section title="Add new Vendor" className="mb-20">
                    <div className="flex items-center gap-2">
                        <Label>Vendor Name:</Label>
                        <TextBox value={newVendor} onChange={(e) => setNewVendor(e.target.value)} />
                        <PrimaryButton text="Add Vendor" onClick={handleAddVendor} />
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
                        <Label>Total Tickets:</Label>
                        <TextBox
                            name="totalTickets"
                            register={register}
                            errors={errors}
                            placeholder="Enter a number"
                        />

                        <Label>Ticket Release Rate:</Label>
                        <TextBox
                            name="ticketReleaseRate"
                            register={register}
                            errors={errors}
                            placeholder="Enter a number"
                        />

                        <Label>Customer Retrievel Rate:</Label>
                        <TextBox
                            name="customerRetrievalRate"
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
                    />
                </Section>
            </div>
        </div>
    );
};

export default Vendor;
