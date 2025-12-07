
import { useNode, useEditor } from "@craftjs/core"
import { Trash2 } from "lucide-react"
import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
    const { id } = useNode()
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent("selected").contains(id),
    }))

    const {
        isHover,
        dom,
        name,
        deletable,
        props,
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        deletable: query.node(node.id).isDeletable(),
        props: node.data.props,
    }))

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) {
                dom.classList.add("component-selected")
            } else {
                dom.classList.remove("component-selected")
            }
        }
    }, [dom, isActive, isHover])

    // Extract spacing values for visualization
    const padding = props.padding || 0
    const marginTop = props.marginTop || 0
    const marginBottom = props.marginBottom || 0
    const marginLeft = props.marginLeft || 0
    const marginRight = props.marginRight || 0
    const gap = props.gap !== undefined ? props.gap : null

    // Don't show visual overlay for Page component (but settings are accessible)
    if (name === "Page") return <>{render}</>

    return (
        <>
            {(isActive || isHover) && dom
                ? createPortal(
                    <div
                        className="fixed z-[9999] pointer-events-none transition-all duration-200"
                        style={{
                            left: dom.getBoundingClientRect().left,
                            top: dom.getBoundingClientRect().top,
                            width: dom.getBoundingClientRect().width,
                            height: dom.getBoundingClientRect().height,
                            border: isActive ? "2px solid #3b82f6" : "1px dashed #3b82f6",
                        }}
                    >
                        {/* Margin visualization (orange) - only when active */}
                        {isActive && (marginTop > 0 || marginBottom > 0 || marginLeft > 0 || marginRight > 0) && (
                            <>
                                {marginTop > 0 && (
                                    <div className="absolute left-0 right-0 bg-orange-200/30 border-t border-orange-400"
                                        style={{ top: -marginTop, height: marginTop }}>
                                        <span className="text-[8px] text-orange-600 font-mono bg-white px-1">{marginTop}px</span>
                                    </div>
                                )}
                                {marginBottom > 0 && (
                                    <div className="absolute left-0 right-0 bg-orange-200/30 border-b border-orange-400"
                                        style={{ bottom: -marginBottom, height: marginBottom }}>
                                        <span className="text-[8px] text-orange-600 font-mono bg-white px-1">{marginBottom}px</span>
                                    </div>
                                )}
                                {marginLeft > 0 && (
                                    <div className="absolute top-0 bottom-0 bg-orange-200/30 border-l border-orange-400"
                                        style={{ left: -marginLeft, width: marginLeft }}>
                                        <span className="text-[8px] text-orange-600 font-mono bg-white px-1">{marginLeft}px</span>
                                    </div>
                                )}
                                {marginRight > 0 && (
                                    <div className="absolute top-0 bottom-0 bg-orange-200/30 border-r border-orange-400"
                                        style={{ right: -marginRight, width: marginRight }}>
                                        <span className="text-[8px] text-orange-600 font-mono bg-white px-1">{marginRight}px</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Padding visualization (green) - only when active */}
                        {isActive && padding > 0 && (
                            <>
                                <div className="absolute left-0 right-0 top-0 bg-green-200/20 border-t border-green-400"
                                    style={{ height: padding }}>
                                    <span className="text-[8px] text-green-600 font-mono bg-white px-1">pad: {padding}px</span>
                                </div>
                                <div className="absolute left-0 right-0 bottom-0 bg-green-200/20 border-b border-green-400"
                                    style={{ height: padding }} />
                                <div className="absolute top-0 bottom-0 left-0 bg-green-200/20 border-l border-green-400"
                                    style={{ width: padding }} />
                                <div className="absolute top-0 bottom-0 right-0 bg-green-200/20 border-r border-green-400"
                                    style={{ width: padding }} />
                            </>
                        )}

                        {/* Gap indicator */}
                        {isActive && gap !== null && gap > 0 && (
                            <div className="absolute -bottom-7 right-0 bg-purple-500 text-white text-[8px] px-1 rounded-sm font-mono">
                                gap: {gap}px
                            </div>
                        )}

                        {/* Component label */}
                        <div
                            className="absolute -top-7 left-0 h-6 px-2 flex items-center bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-t-sm shadow-sm pointer-events-none"
                        >
                            {name}
                        </div>

                        {/* Delete button */}
                        {deletable && isActive && name !== "Documento General" && name !== "Header (Cabecera)" && name !== "Footer (Pie)" && name !== "Body (Cuerpo)" ? (
                            <div
                                className="absolute -top-7 -right-[2px] h-6 w-6 flex items-center justify-center bg-red-500 text-white cursor-pointer rounded-t-sm hover:bg-red-600 transition-colors pointer-events-auto shadow-sm"
                                onMouseDown={(e) => {
                                    e.stopPropagation()
                                    actions.delete(id)
                                }}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </div>
                        ) : null}
                    </div>,
                    document.querySelector(".craftjs-renderer") || document.body
                )
                : null}
            {render}
        </>
    )
}
