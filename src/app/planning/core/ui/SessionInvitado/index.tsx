/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FormDataAccesoPlanning } from "../../domain/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAccesoPlanningValidate } from "../../domain/validateSchema";
import { useDispatch } from "react-redux";
import {
  setPlanningId,
  setProfile,
  setTeamPoints,
} from "../../infrastructure/redux";
import { servicesPlanningLive } from "../../infrastructure/services";
import { ITeam } from "@/app/plannings/core/domain/interfaces";
import Avatars from "@/components/Avatars";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PiPasswordLight } from "react-icons/pi";

interface IProps {
  protectPlanning: boolean;
  titlePlanning: string;
  descriptionPlanning: string;
  planningId: string;
  teams: ITeam[];
}

const SessionInvitado = ({
  titlePlanning,
  descriptionPlanning,
  planningId,
  teams,
  protectPlanning,
}: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [passwordSucess, setPasswordSucess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const param: any = useSearchParams();

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormDataAccesoPlanning>({
    resolver: yupResolver(schemaAccesoPlanningValidate),
    defaultValues: {
      name: "",
      email: "",
      modeObserver: false,
    },
  });

  const { createGuestTemporal, loading } =
    servicesPlanningLive.createGuestTemporal(onSuccess);

  const { modalValidatePassword } =
    servicesPlanningLive.validatePasswordPlanning((result: any) => {
      if (!result.validatePasswordPlanning) {
        setErrorPassword("Contraseña incorrecta");
        return false;
      }
      onOpenChange();
    });

  const [avatar, setAvatar] = useState<string | null>(null);
  const [ErrorPlanning, setErrorPlanning] = useState<string | null>(null);

  const [selected, setSelected] = React.useState<string>("");

  const [inputPassword, setInputPasword] = useState<any>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  useEffect(() => {
    if (protectPlanning) {
      onOpen();
    }
  }, [protectPlanning]);

  function onSuccess(result: any) {
    const { __typename } = result.createGuestTemporal;

    if (__typename === "Error") {
      const { message } = result.createGuestTemporal;
      setErrorPlanning(message);
      return false;
    }
    const guest = result.createGuestTemporal;
    dispatch(setProfile(guest));
    dispatch(setPlanningId(planningId));
    //dispatch(setTeamPoints(guest));
  }

  const onSubmit = async (data: any) => {
    const body = { ...data, teamId: selected, planningId, avatar };
    createGuestTemporal({
      variables: {
        data: body,
      },
    });
  };

  const validatePassword = () => {
    modalValidatePassword({
      variables: {
        planningId,
        password: inputPassword,
      },
    });
  };

  useEffect(() => {
    if (param) {
      setValue("name", param.get("name") || "");
      setValue("email", param.get("email") || "");
      setAvatar(param.get("avatar") || "");
      setSelected(param.get("teamId") || "");
    }
  }, [param]);
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="w-[400px] flex flex-col items-center bg-white rounded-lg p-8 shadow-card">
          <h2 className="text-sm text-black/70 ">Bienvenido!</h2>
          <div className="relative w-56 h-10">
            <Image
              src="/img/logoColor.svg"
              alt="Logo Planning poker life"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <span className="text-sm mt-2 block">{titlePlanning}</span>
          <small className="text-xs text-secondary-300">
            {descriptionPlanning}
          </small>

          {ErrorPlanning && (
            <span className="font-bold text-sm my-2 text-red-600">
              {ErrorPlanning}
            </span>
          )}

          <div className="w-full space-y-4 my-4">
            <div className="flex items-center space-x-6">
              <Avatars onSave={setAvatar} />
              <Controller
                control={control}
                name="name"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="md"
                    radius="sm"
                    type="text"
                    placeholder="Tu nombre para mostrar"
                    labelPlacement="outside"
                    value={value}
                    onChange={onChange}
                    isInvalid={errors.name ? true : false}
                    errorMessage={errors.name?.message}
                    startContent={
                      <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    size="md"
                    type="email"
                    onChange={onChange}
                    radius="sm"
                    placeholder="Email"
                    labelPlacement="outside"
                    value={value}
                    isInvalid={errors.email ? true : false}
                    errorMessage={errors.email?.message}
                    startContent={
                      <HiOutlineMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </>
              )}
            />

            <div className=" bg-secondary-100/50 rounded-md p-2">
              <RadioGroup
                label="Seleccione el equipo al que pertenece"
                orientation="horizontal"
                color="primary"
                className="text-xs"
                onValueChange={(value: string) => setSelected(value)}
                classNames={{
                  label: "text-sm mb-2",
                  base: " pb-2 gap-4",
                }}
                defaultValue={selected}
              >
                {teams.length > 0 &&
                  teams.map((item: ITeam) => (
                    <Radio
                      classNames={{ label: "text-sm" }}
                      key={item._id}
                      value={item._id}
                    >
                      {item.name}
                    </Radio>
                  ))}
              </RadioGroup>
            </div>
            <Controller
              control={control}
              name="modeObserver"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Checkbox checked={value} onChange={onChange} size="sm">
                  Entrar en modo Observador
                </Checkbox>
              )}
            />
            <Button
              type="button"
              isLoading={loading}
              onClick={handleSubmit(onSubmit)}
              color="primary"
              size="md"
              className="w-full text-md"
              radius="full"
            >
              {" "}
              Entrar a la planning
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Planning protegida
              </ModalHeader>
              <ModalBody>
                <p className=" text-xs text-secondary-400">
                  Ingrese la contraseña de la planning para acceder
                </p>
                <Input
                  size="md"
                  radius="sm"
                  type="password"
                  placeholder="Ingrese la contraseña que se le compartió."
                  labelPlacement="outside"
                  value={inputPassword}
                  onChange={(value: any) => setInputPasword(value.target.value)}
                  isInvalid={errorPassword.length > 0 ? true : false}
                  errorMessage={errorPassword}
                  startContent={
                    <PiPasswordLight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => validatePassword()}>
                  Validar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SessionInvitado;
