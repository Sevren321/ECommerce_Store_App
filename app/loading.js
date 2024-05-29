//component particularly named for a particular purpose
//no loading state inside our app

export default function Loading() {
    return (
    //component that will wrap our app like layout acts like new suspense tags in react, check for any promises in the children content, if they do page displayed
        <div>Loading...</div>
    )
}