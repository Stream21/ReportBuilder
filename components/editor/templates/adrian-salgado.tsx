
import { Element } from "@craftjs/core"
import { Page, Image, Header, Footer, Container } from "@/components/editor/components"

export const AdrianSalgadoLayout = () => {
    return (
        <Element
            canvas
            is={Page}
            padding={8}
            paddingBottom={100}
            gap={10}
            backgroundColor="#ffffff"
        >
            {/* Header Section - 20% Height */}
            <Element
                canvas
                is={Header}
                height="20%"
                custom={{ displayName: "Header (Cabecera)" }}
            >
                <Element is={Container} width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Element is={Image} src="/adrian-logo.png" width="300px" height="auto" alt="Adrian Salgado Logo" />
                </Element>
            </Element>

            {/* Body Section - 60% Height */}
            <Element
                canvas
                is={Container}
                flexDirection="column"
                width="100%"
                height="60%"
                gap={15}
                padding={20}
                custom={{ displayName: "Body (Cuerpo)" }}
            >
                {/* Empty Body for User Content */}
            </Element>

            {/* Footer Section - 20% Height */}
            <Element
                canvas
                is={Footer}
                height="20%"
                custom={{ displayName: "Footer (Pie)" }}
            >
                {/* Empty Footer for User Content */}
            </Element>
        </Element>
    )
}
