import React, { useState, useEffect } from 'react';
import Card  from '@/components/Card'
import { useSelector, useDispatch } from "react-redux";
import { AddIcon, EditIcon, DeleteIcon, CloseIcon, LoadingIcon } from '@/components/Icons'
import { ModalBasic } from "@/components/ModalBasic";
import {
  getListContact,
  addNewContact,
  editContact,
  deleteContactById,
  getDetailContact,
  setLoading,
} from "@/store/slice/contact";
import toast from "react-hot-toast";
import { imagekitClient } from "@/api";

function App() {
  const dispatch = useDispatch()
  const {
    isLoading,
    listContact,
  } = useSelector((state) => state.contact);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formAddContact, setFormAddContact] = useState({
    firstName: '',
    lastName: '',
    age: '',
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  const handleOnChangeFormAddContact = (name, value) => {
    setFormAddContact((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    getDataContact()
  }, [])

  useEffect(() => {
    if (!imageUrl) {
      setPreviewImageUrl(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(imageUrl)
    setPreviewImageUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageUrl])

  const onUploadFile = () => {
    dispatch(setLoading(true))
    imagekitClient.upload({
      file : imageUrl,
      fileName : `foto-profile`,
      extensions: [
          {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95
          }
      ]
    }).then(response => {
      selectedId?.id ? onEditContact({ photoUrl: response?.url }) : onAddNewContact({ photoUrl: response?.url })
    }).catch(error => {
      toast.error('failed uploading attachment, please try again.')
    });
  }

  const getDataContact = () => {
    dispatch(getListContact())
  }

  const onResetForm = () => {
    setFormAddContact({
      firstName: '',
      lastName: '',
      age: '',
    })
  }
  const onDeleteContact = async () => {
    const del = await dispatch(deleteContactById({ id: selectedId.id}))
    if (del.payload === true) {
      setShowModalDelete(false)
      getDataContact()
      setSelectedId(null)
      setImageUrl(null)
      setPreviewImageUrl(null)
      toast.success('Berhasil menghapus kontak.')
    }
  }

  const onAddNewContact = async ({ photoUrl }) => {
    const add = await dispatch(addNewContact({
      ...formAddContact,
      photo: photoUrl,
    }))
    if (add.payload === true) {
      setShowModal(false)
      getDataContact()
      onResetForm()
      setImageUrl(null)
      setPreviewImageUrl(null)
      toast.success('Berhasil menambahkan kontak baru.')
    }
  }

  const onEditContact = async ({ photoUrl }) => {
    const edit = await dispatch(editContact({
      id: selectedId.id,
      payload: {
        ...formAddContact,
        photo: photoUrl,
      },
    }))
    if (edit.payload === true) {
      setShowModal(false)
      getDataContact()
      onResetForm()
      setSelectedId(null)
      toast.success('Berhasil mengubah kontak.')
    }
  }

  const onGetDetailContact = async ({ id }) => {
    const { payload } = await dispatch(getDetailContact({ id }))
    if (payload) {
      setShowModal(true)
      setFormAddContact({
        firstName:  payload.data.firstName,
        lastName:  payload.data.lastName,
        age:  payload.data.age,
        photo:  payload.data.photo
      })
      setPreviewImageUrl(payload.data.photo)
      setSelectedId({
        id: payload.data.id
      })
    }
  }

  return(
    <div className="p-5 bg-white text-black min-h-screen">
      <div className="text-xl font-extrabold">Ruang Kontak</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {
          listContact.map((obj, index) => {
            return (
              <Card key={obj.id} xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black group cursor-default">
                <div className="flex items-center gap-x-2 relative">
                  <img
                    loading='lazy'
                    src={obj.photo}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src='https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
                    }}
                    className="w-12 h-12 rounded-lg object-cover bg border-2 border-black self-start"
                  />
                  <div>
                    <p>{`${obj.firstName} ${obj.lastName}`}</p>
                    <div className="flex items-center gap-x-1">{`${obj.age}`}<div className='text-white bg-indigo-600 px-2 rounded-lg w-fit text-xs'>tahun</div></div>
                  </div>
                  <div className="absolute -right-4 -top-4  hidden group-hover:block">
                    <div
                      onClick={() => {
                        onGetDetailContact({ id: obj.id })
                      }}
                      className="p-1 bg-amber-200 border-2 border-black rounded cursor-pointer hover:bg-amber-300"
                    >
                      <EditIcon  className="w-4 h-4"/>
                    </div>
                    <div onClick={() => {
                        setShowModalDelete(true)
                        setSelectedId(obj)
                      }}
                      className="p-1 bg-red-200 border-2 border-black rounded mt-1 cursor-pointer hover:bg-red-400"
                    >
                      <DeleteIcon  className="w-4 h-4"/>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        }
        <Card onClick={() => {setShowModal(true), setImageUrl(null), setPreviewImageUrl(null)}} xShadow={3} yShadow={4} className="bg-white rounded-lg p-6 text-black border-2 border-black w-fit cursor-pointer hover:bg-indigo-300 flex items-center">
          <AddIcon className="w-6 h-6"/>
        </Card>
      </div>

      <ModalBasic
        showModal={showModal}
        setShowModal={(e) => setShowModal(e)}
      >
        <div className="px-4 py-6 w-[400px] over">
          <div className="absolute right-2 top-2 cursor-pointer" onClick={() => {
            onResetForm()
            setShowModal(false)
          }}>
            <CloseIcon className="h-7 w-7 fill-gray-900"/>
          </div>
          <label className="mb-2 font-semibold text-gray-900">{!!selectedId ? 'Edit Kontak' : 'Tambah Kontak Baru'}</label>
          <div className="flex flex-col items-center w-full py-5">
            <div className="flex w-full mb-4 gap-x-3">
              <div className="w-full">
                <label className="bblock text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Depan</label>
                <input
                  id="name"
                  type="text"
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukan nama depan anda"
                  required
                  value={formAddContact?.firstName}
                  onChange={(e) => handleOnChangeFormAddContact('firstName', e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full mb-4 gap-x-3">
              <div className="w-full">
                <label className="bblock text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Belakang</label>
                <input
                  id="name"
                  type="text"
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukan nama belakang anda"
                  required
                  value={formAddContact?.lastName}
                  onChange={(e) => handleOnChangeFormAddContact('lastName', e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full mb-4 gap-x-3">
              <div className="w-full">
                <label className="bblock text-gray-700 text-sm font-bold mb-2" htmlFor="name">Umur</label>
                <input
                  id="name"
                  type="text"
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukan umur anda"
                  required
                  value={formAddContact?.age}
                  onChange={(e) => handleOnChangeFormAddContact('age', e.target.value)}
                />
              </div>
            </div>
            {
              previewImageUrl ?
              <>
                <img src={previewImageUrl} className="h-[150px] w-full object-contain"/>
                {
                  previewImageUrl &&
                  <button
                    onClick={() => {
                      setImageUrl(null)
                      setPreviewImageUrl(null)
                    }}
                    className="mt-2 flex items-center group h-6 text-xs px-2 border border-indigo-700 text-indigo-700 bg-white rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-700 hover:text-white"
                  >
                    Ubah foto
                  </button>
                }
              </>
              :
              <>
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Upload foto</p>
                    </div>
                    <input type="file" className="opacity-0" onChange={(e) => setImageUrl(e.target.files[0])}/>
                </label>
              </>
            }

          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onUploadFile()}
              disabled={isLoading || !formAddContact?.firstName || !formAddContact?.lastName || !formAddContact?.age || !previewImageUrl || !imageUrl}
              className="px-6 py-2 disabled:cursor-not-allowed disabled:opacity-60  text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800 flex items-center gap-x-1"
            >
              {
                isLoading && <LoadingIcon className="h-4 w-4 fill-white animate-spin"/>
              }
              Submit
            </button>
          </div>
        </div>
      </ModalBasic>
      <ModalBasic
        showModal={showModalDelete}
        setShowModal={(e) => setShowModalDelete(e)}
      >
        <div className="px-4 py-6 w-[400px] over">
          <div className="absolute right-2 top-2 cursor-pointer" onClick={() => {
            setSelectedId(null)
            setShowModalDelete(false)
          }}>
            <CloseIcon className="h-7 w-7 fill-gray-900"/>
          </div>
          <p className="mb-2 font-semibold text-gray-900">{`Menghapus Kontak`}</p>
          <p className="mb-2 text-gray-900">Apakah kamu yakin ingin menghapus kontak <b>{`${selectedId?.firstName ?? ''} ${selectedId?.lastName ?? ''}`}</b></p>
          <div className="flex justify-end gap-x-2">
            <button
              onClick={() => {
                setSelectedId(null)
                setShowModalDelete(false)
              }}
              className="px-6 py-2 text-red-600 bg-white border-2 border-red-600 rounded-lg outline-none duration-150"
            >
              Batal
            </button>
            <button
              onClick={() => onDeleteContact()}
              disabled={isLoading}
              className="px-6 py-2 disabled:cursor-not-allowed disabled:opacity-60 text-white bg-red-600 rounded-lg duration-150 hover:bg-red-800 flex items-center gap-x-1"
            >
              {
                isLoading && <LoadingIcon className="h-4 w-4 fill-white animate-spin"/>
              }
              Hapus Kontak
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  )
}

export default App
