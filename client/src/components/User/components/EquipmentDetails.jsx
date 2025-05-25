"use client"
import { Button, Form, Switch } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { UserContext } from "../../../Contexts/User";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { requestUrl } from "../../../utils/constants";
import EquipmentForm from "./EquipmentForm";
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import EquipmentData from "./EquipmentData";

const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });

const EquipmentDetails = () => {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [form] = Form.useForm();

  const [hideEquipmentForm, setHideEquipmentForm] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(switchChecked);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    if (user?.equipmentDetails?.equipments.length > 0) {
      setIsDisabled(false);
      setSwitchChecked(false);
    }
  }, [user]);

  const handleEditToggle = () => {
    setDisabled(!disabled);
    setEditing(!editing);
  };

  const handleEquipmentSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        purchasedOn: dayjs(values.purchasedOn).year(),
      };
      const userAuth = cookies.get('auth');
      await axios.post(`${requestUrl}/user/details/equipment`, { equipments: formattedValues }, {
        headers: {
          Authorization: `Bearer ${userAuth}`
        },
        withCredentials: true
      });
      toast.success("Equipment details saved successfully!");
      form.resetFields();
      setHideEquipmentForm(false);
      setLoading(false);
      fetchUserDetails();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save equipment details. Please check the form for errors.");
      setLoading(false);
    }
  };

  const handleSwitchChange = (checked) => {
    setSwitchChecked(checked);
    setIsDisabled(checked);
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={handleEquipmentSubmit}>
        <div className="flex gap-5 items-center m-4 flex-wrap">
          <Form.Item
            label="I have no any GIS equipment"
            valuePropName="checked"
            className="m-0"
          >
            <Switch
              size="large"
              checked={switchChecked}
              onChange={handleSwitchChange}
              disabled={user?.equipmentDetails?.equipments.length > 0}
            />
          </Form.Item>
        </div>

        <div>
          <Button
            type="primary"
            onClick={() => setHideEquipmentForm(!hideEquipmentForm)}
            className={`flex items-center mx-2 ${hideEquipmentForm ? 'bg-red-500 text-white' : ''}`}
            disabled={isDisabled}
          >
            {hideEquipmentForm ? 'Remove' : <>Add GIS Equipment &nbsp; <PlusCircleFilled /></>}
          </Button>
        </div>

        {hideEquipmentForm && <EquipmentForm handleEquipmentSubmit={form.submit} form={form} loading={loading} setLoading={setLoading} />}
      </Form>

      <div className="my-10 flex-grow">
        <EquipmentData />
      </div>
    </div>
  );
};

export default EquipmentDetails;
